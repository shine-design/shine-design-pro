/**
 * @Component 表格布局项 - UI
 * @Type 布局
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/25 13:13
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

// 组件依赖

// 样式

export default class extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		...COMMON_PROPS_TYPE,
		verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
		textAlign: PropTypes.oneOf(['left', 'center', 'right']),
		isFluid: PropTypes.bool,
		isFirst: PropTypes.bool,
		isLast: PropTypes.bool
	};

	static defaultProps = {
		...COMMON_PROPS_DEFAULT,
		isFluid: true,
		isFirst: false,
		isLast: false
	};

	render() {
		const {verticalAlign, textAlign, isFluid, isFirst, isLast, children, attributes, className, callbacks} = this.props;
		const _className = classNames(
			'sh-stack__item',
			{
				[`sh-stack__item--${verticalAlign}`]: _.isString(verticalAlign) && _.includes(['middle', 'bottom', 'top'], verticalAlign),
				[`sh-stack__item--${textAlign}`]: _.isString(textAlign) && _.includes(['left', 'right', 'center'], textAlign),
				'sh-stack__item--fluid': isFluid,
				'sh-stack__item--first': isFirst,
				'sh-stack__item--last': isLast
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
