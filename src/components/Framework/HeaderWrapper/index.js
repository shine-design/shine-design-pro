/**
 * @Component  顶部容器 - index
 * @Type 框架
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/26 14:54
 */

// 核心依赖
import React, {Component, Fragment} from 'react';

// 组件依赖
import Stack from '../../_Internal/Stack';
import Container from '../../_Internal/Container';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {children} = this.props;
		return (
			<Fragment>
				<Container isFluid={true}>
					<Stack>
						{children}
					</Stack>
				</Container>
			</Fragment>
		);
	}
}
