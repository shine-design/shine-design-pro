/**
 * @Component 品牌商标 - UI
 * @Type 页面框架
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/25 14:02
 */

// 核心依赖
import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';

// 第三方依赖库
import classNames from 'classnames'
import _ from 'lodash';

// 组件依赖
import Stack from '../../_Internal/Stack/index';
import StackItem from '../../_Internal/StackItem/index';
import Logo from './components/Logo/index';
import Tool from './components/Tools/index';

// 样式
import './style';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {skin, source, link} = this.props;

		const _className = classNames(
			'sh-brand',
			{
				[`sh-brand--skin-${skin}`]: _.isString(skin)
			}
		);

		return (
			<Fragment>
				<StackItem className={_className} isFluid={false}>
					<Stack mode={0}>
						<Logo source={source} link={link}/>
						<Tool/>
					</Stack>
				</StackItem>
			</Fragment>
		);
	}
}
