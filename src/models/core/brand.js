import logo from 'app/assets/logo/logo_pro_sm.png';

/**
 * 品牌商标 - Model
 */

const initState = {
	source: logo, // logo 图片地址
	link: '/', // 点击logo跳转路径
};

export default {
	namespace: 'brand',
	state: initState,
	reducers: {}
};
