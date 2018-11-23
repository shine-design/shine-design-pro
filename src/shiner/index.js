import _ from 'lodash';
import noop from 'lodash-es/noop';
import isPlainObject from 'lodash-es/isPlainObject';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider, connect as hkConnect} from 'react-redux';
import handleActions from './handleActions';
import invariant from 'invariant';
import window from 'global/window';
import document from 'global/document';

import Event from './event';


const SEP = '/';

export default function (opts = {}) {
	const {
		initialReducer = {},
		initialState = {},
		extraMiddlewares = [],
		extraEnhancers = []
	} = opts;

	const event = new Event();

	// error wrapper
	event.on('error', function (err) {
		throw new Error(err.stack || err);
	});

	const app = {
		// private properties
		_models: [],
		_store: null,
		_event: event,
		// methods
		model,
		start,
		connect,
		getProvider: null
	};
	return app;


	////////////////////////////////////
	// Methods

	/**
	 * Register a model.
	 *
	 * @param model
	 */
	function model(model) {
		if (_.isArray(model)) {
			_.forEach(model, (item) => {
				this._models.push(checkModel(item));
			})
		} else this._models.push(checkModel(model));
	}

	// inject model dynamically
	function injectModel(createReducer, m) {
		if (m.namespace) {
			const hasExisted = this._models.some(model =>
				model.namespace === m.namespace
			);
			if (hasExisted) {
				return;
			}
		}
		m = checkModel(m);
		this._models.push(m);
		const store = this._store;

		// reducers
		store.additionalReducers[m.namespace] = getReducer(m.reducers, m.state);
		store.replaceReducer(createReducer(store.additionalReducers));
	}

	/**
	 * Start the application. Selector is optional. If no selector
	 * arguments, it will return a function that return JSX elements.
	 *
	 * @param container selector | HTMLElement
	 * @param RootComponent Component
	 * @param onRendered rendered callback
	 */
	function start(container, RootComponent, onRendered) {
		// support selector
		if (typeof container === 'string') {
			container = document.querySelector(container);
			invariant(container, 'shiner->start: could not query selector: ' + container);
		}

		invariant(!container || isHTMLElement(container), 'shiner->start: container should be HTMLElement');

		let reducers = {...initialReducer};
		for (let m of this._models) {
			reducers[m.namespace] = getReducer(m.reducers, m.state);
		}

		let devTools = () => noop => noop;
		if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
			devTools = window.__REDUX_DEVTOOLS_EXTENSION__;
		}
		const enhancers = [
			applyMiddleware(...extraMiddlewares),
			devTools(),
			...extraEnhancers
		];
		const store = this._store = createStore(
			createReducer(),
			initialState,
			compose(...enhancers)
		);

		function createReducer(additionalReducers = {}) {
			return combineReducers({
				...reducers,
				...additionalReducers
			});
		}

		store.additionalReducers = {};

		// inject model after start
		this.model = injectModel.bind(this, createReducer);

		this.getProvider = getProvider.bind(this);

		// If has container, render; else, return react component
		if (container) {
			render.call(this, container, RootComponent, onRendered);
			event.on('hmr', Component => render.call(this, container, Component, onRendered));
		} else {
			return getProvider(RootComponent);
		}
	}

	function buildHandler(handler, key) {
		const context = {
			traceId: 'trace-callback-' + (Math.random() + '').replace('0.', '') + '-' + key,
			callback: key
		};
		const dispatch = (action) => {
			action.meta = {
				_traceId: context.traceId,
				_callback: context.callback,
				...(action.meta || {})
			};
			event.trigger('beforeDispatch', [{action, ...context}, dispatch]);
			app._store.dispatch(action);
			event.trigger('afterDispatch', [{action, ...context}, dispatch]);
		};
		dispatch.trace = context;

		return (...args) => {
			const triggerError = err => event.trigger('error', [{error: err, ...context}, dispatch]);

			try {
				event.trigger('beforeCallback', [context, dispatch]);

				const ret = handler.call(null, {
					getState: app._store.getState,
					dispatch
				}, ...args);

				if (ret instanceof Promise) {
					ret.catch(err => {
						triggerError(err);
						event.trigger('afterCallback', [{result: ret, ...context}, dispatch]);
						return Promise.reject(err);
					});
				}
				else {
					event.trigger('afterCallback', [{result: ret, ...context}, dispatch]);
				}

				return ret;
			}
			catch (err) {
				triggerError(err);
			}
		};
	}

	// 使用react-redux-hk来优化性能
	function connect(getUIState, callbacks, mergeProps, options = {}) {
		invariant(
			typeof getUIState === 'undefined' || typeof getUIState === 'function',
			'shiner->connect: getUIState should be function'
		);
		const mapStateToProps = getUIState;
		const mapDispatchToProps = !callbacks ? undefined : () => {
			if (!callbacks.initializedCallbacks) {
				invariant(
					isPlainObject(callbacks),
					'shiner->connect: callbacks should be plain object'
				);
				let initializedCallbacks = {};
				Object.keys(callbacks).map((key) => {
					invariant(
						typeof callbacks[key] === 'function',
						'shiner->connect: callbacks\'s each item should be function, but found ' + key
					);
					event.trigger('injectCallback', [key, callbacks[key]]);
					initializedCallbacks[key] = buildHandler(callbacks[key], key);
				});
				callbacks.initializedCallbacks = initializedCallbacks;
			}
			return callbacks.initializedCallbacks;
		};
		return UI => {
			return hkConnect(
				mapStateToProps,
				mapDispatchToProps,
				mergeProps,
				options
			)(UI);
		};
	}


	////////////////////////////////////
	// Helpers
	function getProvider(RootComponent) {
		const store = app._store;
		return () => (
			<Provider store={store}>
				{RootComponent}
			</Provider>
		);
	}

	function render(container, RootComponent, cb = noop) {
		ReactDOM.render(
			React.createElement(getProvider(RootComponent)),
			container,
			cb.bind(null, app._store)
		);
	}

	function checkModel(m) {
		// Clone model to avoid prefixing namespace multiple times
		const model = {...m};
		const {namespace, reducers} = model;

		invariant(
			namespace,
			'shiner->model: namespace should be defined'
		);
		invariant(
			!reducers || isPlainObject(reducers) || Array.isArray(reducers),
			'shiner->model: reducers should be plain object or array'
		);
		invariant(
			!Array.isArray(reducers) || (isPlainObject(reducers[0]) && typeof reducers[1] === 'function'),
			'shiner->model: reducers with array should be app.model({ reducers: [object, function] })'
		);
		invariant(
			!app._models.some(model => model.namespace === namespace),
			'app.model: namespace should be unique'
		);

		function getNamespacedReducers(reducers) {
			return Object.keys(reducers).reduce((memo, key) => {
				invariant(
					key.indexOf(`${namespace}${SEP}`) !== 0,
					`shiner->model: reducer ${key} should not be prefixed with namespace ${namespace}`
				);
				memo[`${namespace}${SEP}${key}`] = reducers[key];
				return memo;
			}, {});
		}

		if (model.reducers) {
			if (Array.isArray(model.reducers)) {
				model.reducers[0] = getNamespacedReducers(model.reducers[0]);
			} else {
				model.reducers = getNamespacedReducers(model.reducers);
			}
		}

		return model;
	}

	function isHTMLElement(node) {
		return typeof node === 'object' && node !== null && node.nodeType && node.nodeName;
	}

	function getReducer(reducers, state) {
		if (Array.isArray(reducers)) {
			return reducers[1](handleActions(reducers[0], state));
		} else {
			return handleActions(reducers || {}, state);
		}
	}

};
