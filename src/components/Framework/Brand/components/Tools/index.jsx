/**
 * @Component 图标按钮 - index
 * @Type 图标
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/25 21:41
 */

// 核心依赖
import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';

// 第三方依赖库
import classNames from 'classnames'
import _ from 'lodash';
import StackItem from '../../../../_Internal/StackItem/index';

// 组件依赖

// 样式

export default class extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {};

	static defaultProps = {};

	render() {
		return (
			<Fragment>
				<StackItem className={['sh-brand__tools']} isFluid={false} verticalAlign="middle">

				</StackItem>
			</Fragment>
		);
	}
}
