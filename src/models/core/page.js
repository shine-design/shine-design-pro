/**
 * 顶层容器 - Model
 */

const initState = {
	type: 'fluid', // 页面布局方式： 流式布局fluid，盒状布局boxed
	loader: 1, // 页面Loader 不显示 - -1 ，动画 - 0 文字 - 2
	contentSkin: 'light2' // 页面背景皮肤 白色 - light ，灰色 - light2
};

export default {
	namespace: 'page',
	state: initState,
	reducers: {}
};
