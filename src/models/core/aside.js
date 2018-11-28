/**
 * 基础配置 - Model
 */
import items from 'app/config/menu';

const initState = {
		skin: 'inherit', // inherit / dark / light
		isShow: true,  // 显示侧边栏
		isFixed: true, // 是否固定侧边栏
		isAllowMin: false, // 是否允许最小化 与隐藏互斥
		isAllowHide: false, // 是否允许隐藏 与最小化互斥
		defaultType: 0, // 默认侧边栏状态 0 - 展开 1 - 收起 2 - 隐藏
		menu: {
			items,
			skin: 'inherit', // inherit / dark / light
			subMenu: {
				toggle: 0, // 0 - dropdown  1 - according
				skin: 'inherit', // inherit / dark / light
				isShowAllow: true // Dropdown类型是否显示箭头
			}
		}
	}
;

export default {
	namespace: 'aside',
	state: initState,
	reducers: {}
};
