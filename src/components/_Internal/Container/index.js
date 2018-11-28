/**
 * @Component 页面容器 - UI
 * @Type  内部组件
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/24 14:39
 */

// 核心依赖
import React, {Component, Fragment} from 'react';

// 第三方依赖库
import classNames from 'classnames'
import _ from 'lodash';

// 组件依赖

// 样式
import './style';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {autoSize, isFluid, children} = this.props;
		const isAutoSize = _.isArray(autoSize) && !_.isEmpty(autoSize);
		const _className = classNames(
			'sh-container',
			{
				'sh-container--responsive': isAutoSize
			},
			...isAutoSize ? [_.map(autoSize, size => size)] : [],
			...isFluid ? [
				'sh-container--fluid',
				'sh-container--full-height'
			] : []
		);
		return (
			<Fragment>
				<div className={_className}>
					{children}
				</div>
			</Fragment>
		);
	}
}
