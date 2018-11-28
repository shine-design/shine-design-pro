/**
 * @Component Logo - index
 * @Type 图标
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/25 21:37
 */

// 核心依赖
import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';

// 第三方依赖库
import classNames from 'classnames'
import _ from 'lodash';

// 组件依赖
import StackItem from '../../../../_Internal/StackItem/index';

// 样式

export default class extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {link, source} = this.props;
		return (
			<Fragment>
				<StackItem className={['sh-brand__logo']} verticalAlign="middle" isFluid={false}>
					<a href={link} className="sh-brand__logo-wrapper">
						<img alt="Brand Logo" src={source} className="sh-brand__logo-img"/>
					</a>
				</StackItem>
			</Fragment>
		);
	}
}
