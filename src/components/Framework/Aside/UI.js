/**
 * @Component 侧边容器 - UI
 * @Type 框架
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/26 15:43
 */

// 核心依赖
import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';

// 第三方依赖库
import classNames from 'classnames'
import _ from 'lodash';

// 组件依赖
import Grid from '../../_Internal/Grid';
import GridItem from '../../_Internal/GridItem';

// 样式
import './style';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {};

	static defaultProps = {};

	render() {
		const {skin, children} = this.props;

		const _className = classNames(
			'sh-aside-left',
			{
				[`sh-aside-left--skin-${skin}`]: _.isString(skin)
			}
		);

		return (
			<Fragment>
				<Grid mode="desktop" direction="ver" className={_className}>
					<GridItem>
						{children}
					</GridItem>
				</Grid>
			</Fragment>
		);
	}
}
