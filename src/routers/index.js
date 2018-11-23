import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import _ from 'lodash';
import config from '../config/route';

/**
 * 路径校验
 * @type {RegExp}
 */
const actualReg = /^\//;

const modifyPath = (route, path, routeMap) => {
	const actualPath = (isRootPath(path) ? '' : path) + (actualReg.test(route.path) ? route.path : ('/' + route.path));
	route.actualPath = actualPath;
	routeMap.push(route);
	const children = route.children;
	if (_.isArray(children) && !_.isEmpty(children)) {
		_.forEach(children, child => {
			modifyPath(child, actualPath, routeMap);
		})
	}
};

/**
 * 是否为特殊根路径 /
 * @param path
 * @returns {boolean|*}
 */
const isRootPath = (path) => {
	return _.isEqual(path, '/');
};


/**
 * 初始化路径
 * @returns {*}
 */
const initRoute = () => {
	return (
		<Switch>
			{
				_.map(config.rules, (child, index) => {
					const {path, component, isExact} = child;
					const actualPath = actualReg.test(path) ? path : ('/' + path);
					return <Route key={index} path={actualPath} exact={isExact} component={component}/>
				})
			}
		</Switch>
	);
};

/**
 * 获取真实路径平铺数组中
 * @param route
 * @returns {Array}
 */
const _config = ((route) => {
	const _copyRoute = _.cloneDeep(route);
	const routeMap = [];
	_.forEach(_copyRoute.rules, item => {
		modifyPath(item, '', routeMap);
	});
	return routeMap;
})(config);


/**
 * 渲染 Route
 * @param props
 * @returns {*}
 */
export const routeFactory = (props = {}) => {
	const {match} = props;
	if (!_.isUndefined(match)) {
		const rules = _config.find(rule => rule.actualPath === match.path);
		if (_.isUndefined(rules)) return null;
		if (_.isUndefined(rules.children) || !(_.isArray(rules.children)) || (_.isArray(rules.children && _.isEmpty(rules.children)))) return null;
		return (
			<Switch>
				{
					_.map(rules.children, (child, index) => {
						const {actualPath, component, isExact} = child;
						return <Route key={index} path={actualPath} exact={isExact} component={component}/>
					})
				}
			</Switch>
		)
	}
};

export default (<BrowserRouter>{initRoute()}</BrowserRouter>)
