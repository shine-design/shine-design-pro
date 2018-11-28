/**
 * @Component 顶层容器 - UI
 * @Type 页面框架
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/23 23:06
 */

// 核心依赖
import React, {Component, Fragment} from 'react';

// 第三方依赖库
import classNames from 'classnames'
import _ from 'lodash';

// 组件依赖
import Grid from '../../_Internal/Grid';

// 样式
import './style';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {base, page, header, aside, children} = this.props;
		const {skin} = base;
		const {type, loader, contentSkin} = page;
		const {fixed} = header;

		const asideSkin = _.isEqual(aside.skin, 'inherit') ? skin : aside.skin; // 获取 Aside 组件的皮肤

		const _asideClassName = classNames(
			'sh-aside-left--enabled',
			'sh-aside-left--offcanvas',
			{
				[`sh-aside-left--skin-${asideSkin}`]: _.includes(['dark', 'light'], asideSkin)
			}
		);
		const _className = classNames(
			'sh-page',
			`sh-header--${_.includes(fixed, 'desktop') ? 'fixed' : 'static'}`,
			{
				[`sh-page--${type}`]: _.isString(type) && _.includes(['fluid', 'boxed'], type),
				'sh-page--loading-enabled': _.includes([0, 1], +loader),
				'sh-page--loading': _.includes([0, 1], +loader),
				'sh-header--fixed-mobile': _.includes(fixed, 'mobile'),
				[`sh-content--skin-${contentSkin}`]: _.includes(['light', 'light2'], contentSkin)
			},
			_asideClassName
		);

		return (
			<Fragment>
				<div className={_className} style={{height: '600px'}}>
					<Grid isRoot={true}>
						{children}
					</Grid>
				</div>
			</Fragment>
		);
	}
}
