const initialState = {
	field3: 'aa',
	field4: 'bb'
};

export default {
	namespace: 'user',
	state: initialState,
	reducers: {
		onChangeField(state, {payload: field1}) {
			return {
				...state,
				field1
			}
		}
	}
};

