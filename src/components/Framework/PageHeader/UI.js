/**
 * @Component 页面顶部 - UI
 * @Type 框架
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/24 14:31
 */

// 核心依赖
import React, {Component, Fragment} from 'react';

// 第三方依赖库
import classNames from 'classnames'


// 组件依赖
import GridItem from '../../_Internal/GridItem/index';

// 样式
import './style';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {children} = this.props;
		const _className = classNames('sh-header');
		return (
			<Fragment>
				<GridItem tag="header" isFluid={false} className={_className}>
					{children}
				</GridItem>
			</Fragment>
		);
	}
}
