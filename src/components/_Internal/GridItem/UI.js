/**
 * @Component 网格项 - UI
 * @Type 布局
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/24 21:12
 */

// 核心依赖
import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';

// 第三方依赖库
import classNames from 'classnames'
import _ from 'lodash';
import {
	COMMON_PROPS_TYPE,
	COMMON_PROPS_DEFAULT
} from 'app/utils/commonProps';
import {
	ORDER_TYPE,
	ALIGN_TYPE
} from './config';
// 组件依赖

// 样式
// import './style';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		...COMMON_PROPS_TYPE,
		order: PropTypes.oneOf(ORDER_TYPE),
		align: PropTypes.oneOf(ALIGN_TYPE),
		isFluid: PropTypes.bool
	};

	static defaultProps = {
		...COMMON_PROPS_DEFAULT,
		isFluid: true
	};

	render() {
		const {tag, order, align, isFluid, children, attributes, className, callbacks} = this.props;
		const TAG = _.isString(tag) ? tag : 'div';
		const _className = classNames(
			'sh-grid__item',
			{
				'sh-grid__item--fluid': isFluid,
				[`sh-grid__item--order-${order}`]: _.isNumber(order),
				[`m-grid__item--${align}`]: _.isString(align) && _.includes([], align)
			},
			...(
				_.isArray(className) ? className : [className]
			)
		);
		return (
			<Fragment>
				<TAG
					className={_className}
					{...attributes}
					{...callbacks}
				>
					{children}
				</TAG>
			</Fragment>
		);
	}
}
