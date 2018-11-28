import _ from 'lodash';
import Utils from 'app/utils';

export default (elementId, options) => {
	let the = this;
	let init = false;

	const element = Utils.get(elementId);
	const body = Utils.get('body');

	if (element === undefined) {
		return;
	}

	let defaultOptions = {
		classic: false,
		offset: {
			mobile: 150,
			desktop: 200
		},
		minimize: {
			mobile: false,
			desktop: false
		}
	};

	const Plugin = {
		/**
		 * Run plugin
		 * @returns {mHeader}
		 */
		construct: function (options) {
			if (Utils.data(element).has('header')) {
				the = Utils.data(element).get('header');
			} else {
				// reset header
				Plugin.init(options);

				// build header
				Plugin.build();

				Utils.data(element).set('header', the);
			}

			return the;
		},

		/**
		 * Handles subheader click toggle
		 * @returns {mHeader}
		 */
		init: function (options) {
			the.events = [];

			// merge default and user defined options
			the.options = _.assignIn({}, _.cloneDeep(defaultOptions), _.cloneDeep(options));
		},

		/**
		 * Reset header
		 * @returns {mHeader}
		 */
		build: function () {
			let lastScrollTop = 0;

			if (the.options.minimize.mobile === false && the.options.minimize.desktop === false) {
				return;
			}

			window.addEventListener('scroll', function () {
				var offset = 0, on, off, st;

				if (Utils.isInResponsiveRange('desktop')) {
					offset = the.options.offset.desktop;
					on = the.options.minimize.desktop.on;
					off = the.options.minimize.desktop.off;
				} else if (Utils.isInResponsiveRange('tablet-and-mobile')) {
					offset = the.options.offset.mobile;
					on = the.options.minimize.mobile.on;
					off = the.options.minimize.mobile.off;
				}

				st = window.pageYOffset;

				if (
					(Utils.isInResponsiveRange('tablet-and-mobile') && the.options.classic && the.options.classic.mobile) ||
					(Utils.isInResponsiveRange('desktop') && the.options.classic && the.options.classic.desktop)

				) {
					if (st > offset) { // down scroll mode
						Utils.addClass(body, on);
						Utils.removeClass(body, off);
					} else { // back scroll mode
						Utils.addClass(body, off);
						Utils.removeClass(body, on);
					}
				} else {
					if (st > offset && lastScrollTop < st) { // down scroll mode
						Utils.addClass(body, on);
						Utils.removeClass(body, off);
					} else { // back scroll mode
						Utils.addClass(body, off);
						Utils.removeClass(body, on);
					}

					lastScrollTop = st;
				}
			});
		},

		/**
		 * Trigger events
		 */
		eventTrigger: function (name, args) {
			for (let i = 0; i < the.events.length; i++) {
				const event = the.events[i];
				if (event.name === name) {
					if (event.one === true) {
						if (event.fired === false) {
							the.events[i].fired = true;
							event.handler.call(this, the, args);
						}
					} else {
						event.handler.call(this, the, args);
					}
				}
			}
		},

		addEvent: function (name, handler, one) {
			the.events.push({
				name: name,
				handler: handler,
				one: one,
				fired: false
			});
		}
	};

	//////////////////////////
	// ** Public Methods ** //
	//////////////////////////

	/**
	 * Set default options
	 */
	console.log(the);
	the.setDefaults = function (options) {
		defaultOptions = options;
	};

	/**
	 * Register event
	 */
	the.on = function (name, handler) {
		return Plugin.addEvent(name, handler);
	};

	///////////////////////////////
	// ** Plugin Construction ** //
	///////////////////////////////

	//== Run plugin
	Plugin.construct.apply(the, [options]);

	//== Init done
	init = true;

	// Return plugin instance
	return the;
};
