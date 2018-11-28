/**
 * @Component 网格 - UI
 * @Type 布局
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/24 10:31
 */

// 核心依赖
import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';

// 第三方依赖库
import classNames from 'classnames'
import _ from 'lodash';
import {MODE, DIRECTION} from './config';
import {
	COMMON_PROPS_TYPE,
	COMMON_PROPS_DEFAULT
} from 'app/utils/commonProps';

// 组件依赖

// 样式
import './style';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		...COMMON_PROPS_TYPE,
		mode: PropTypes.oneOf(MODE),
		direction: PropTypes.oneOf(DIRECTION),
		isRoot: PropTypes.bool
	};

	static defaultProps = {
		...COMMON_PROPS_DEFAULT,
		mode: 'general',
		direction: 'hor',
		isRoot: false
	};

	render() {
		const {mode, direction, isRoot, children, attributes, className, callbacks} = this.props;
		const hasMode = _.isString(mode) && _.includes(MODE, mode) && !_.isEqual(mode, 'general');
		const _className = classNames(
			'sh-grid',
			{
				[`sh-grid--${mode}`]: hasMode,
				[`sh-grid--${direction}${hasMode ? `-${mode}` : ''}`]: _.isString(direction) && _.includes(DIRECTION, direction),
				'sh-grid--root': isRoot
			},
			...(
				_.isArray(className) ? className : [className]
			)
		);
		return (
			<Fragment>
				<div
					className={_className}
					{...attributes}
					{...callbacks}
				>
					{children}
				</div>
			</Fragment>
		);
	}
}
