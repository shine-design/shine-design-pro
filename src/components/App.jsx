/**
 * @Component 全局入口 - App
 * @Type 基础
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/26 14:39
 */

// 核心依赖
import React, {Component, Fragment} from 'react';

// 组件依赖
import Page from './Framework/Page';

import PageHeader from './Framework/PageHeader';
import HeaderWrapper from './Framework/HeaderWrapper';
import Brand from './Framework/Brand';
import HeaderNav from './Framework/HeaderNav';

import PageBody from './Framework/PageBody';
import Aside from './Framework/Aside';
import Menu from './Framework/Menu';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Fragment>
				<Page>
					<PageHeader>
						<HeaderWrapper>
							<Brand/>
							<HeaderNav/>
						</HeaderWrapper>
					</PageHeader>
					<PageBody>
						<Aside>
							<Menu/>
						</Aside>
					</PageBody>
				</Page>
			</Fragment>
		);
	}
}
