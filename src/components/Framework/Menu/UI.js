/**
 * @Component 导航菜单 - UI
 * @Type 框架
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/27 11:12
 */

// 核心依赖
import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';

// 第三方依赖库
import classNames from 'classnames'
import _ from 'lodash';

// 组件依赖

// 样式
import './style';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {};

	static defaultProps = {};

	render() {
		const {aside, base} = this.props;
		const {menu} = aside;
		const {skin} = base;
		const {subMenu} = menu;
		const menuSkin = _.isEqual(menu.skin, 'inherit') ? skin : menu.skin;
		const submenuSkin = _.isEqual(subMenu.skin, 'inherit') ? menuSkin : subMenu.skin;

		const _className = classNames(
			'sh-aside-menu',
			{
				[`sh-aside-menu--skin-${menuSkin}`]: _.includes(['light', 'dark'], menuSkin),
				[`sh-aside-menu--submenu-skin-${submenuSkin}`]: _.includes(['light', 'dark'], submenuSkin)
			}
		);

		return (
			<Fragment>
				<div className={_className}
						 style={{position: 'relative'}}>
					<ul className="sh-menu__nav sh-menu__nav--submenu-arrow">
						<li className="sh-menu__item " aria-haspopup="true">
							<a href="?page=index&amp;demo=default" className="sh-menu__link ">
								<i className="sh-menu__link-icon flaticon-line-graph"/>
								<span className="sh-menu__link-title">
									<span className="sh-menu__link-wrap">
										<span className="sh-menu__link-text">Dashboard</span>
										<span className="sh-menu__link-badge">
											<span className="sh-badge sh-badge--danger">2</span>
										</span>
									</span>
								</span>
							</a>
						</li>
					</ul>
				</div>
			</Fragment>
		);
	}
}
