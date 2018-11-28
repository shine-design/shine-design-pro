/**
 * @Component 头部导航 - UI
 * @Type 框架
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/26 11:07
 */

// 核心依赖
import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';

// 第三方依赖库
import classNames from 'classnames'
import _ from 'lodash';

// 组件依赖
import StackItem from '../../_Internal/StackItem/index';
import TopBar from './components/TopBar/index';
// 样式
import './style';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {};

	static defaultProps = {};

	render() {
		return (
			<Fragment>
				<StackItem className={['sh-header-head']}>
					<TopBar />
				</StackItem>
			</Fragment>
		);
	}
}
