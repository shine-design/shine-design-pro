/**
 * @Component 表格布局 - UI
 * @Type 布局
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/25 10:32
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
import MODE from 'app/dictionaries/mode';

// 组件依赖

// 样式
import './style';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		...COMMON_PROPS_TYPE,
		direction: PropTypes.oneOf(['hor', 'ver']),
		mode: PropTypes.number,
		isFlex: PropTypes.bool,
		isFluid: PropTypes.bool,
		isInline: PropTypes.bool
	};

	static defaultProps = {
		...COMMON_PROPS_DEFAULT,
		direction: 'ver',
		isFlex: false,
		isFluid: false,
		isInline: false
	};

	render() {
		const {mode, direction, isFlex, isFluid, isInline, children, attributes, className, callbacks} = this.props;
		const _mode = MODE[mode];

		const _className = classNames(
			'sh-stack',
			{
				[`sh-stack--${direction}`]: _.isString(direction) && _.includes(['hor', 'ver'], direction),
				[`sh-stack--flex-${_mode}`]: isFlex && _.isString(_mode),
				[`sh-stack--${_mode}`]: _.isString(_mode),
				'sh-stack--fluid': isFluid,
				'sh-stack--inline': isInline
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
