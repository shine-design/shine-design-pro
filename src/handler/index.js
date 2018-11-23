export const onInit = async ({dispatch, getState}) => {
	// 初始化
	dispatch({
		type: 'login/onChangeField',
		payload: {
			field1:'csdcsd'
		}
	})
};
