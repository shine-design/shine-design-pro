const initialState = {
	field1: 'aa',
	field2: 'bb'
};

export default {
	namespace: 'login',
	state: initialState,
	reducers: {
		onChangeField(state, {payload: {field1}}) {
			return {
				...state,
				field1
			}
		}
	}
};

