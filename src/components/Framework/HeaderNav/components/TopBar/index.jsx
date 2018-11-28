/**
 * @Component 头部导航 - TopBar
 * @Type 框架
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/26 11:36
 */

// 核心依赖
import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';

// 第三方依赖库
import classNames from 'classnames'
import _ from 'lodash';

// 组件依赖
import Stack from '../../../../_Internal/Stack/index';

// 样式
import './style';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {};

	static defaultProps = {};

	render() {
		const {children} = this.props;
		return (
			<Fragment>
				<Stack
					className={['sh-topbar']}
					mode={0}
					isFulid={true}
				>
					{children}
				</Stack>
			</Fragment>
		);
	}
}
