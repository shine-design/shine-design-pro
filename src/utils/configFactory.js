import _ from 'lodash';

export const fetchConfig = (configList = [], handler = null, returnField = 'value', checkField = 'type') => {
	if (_.isArray(configList)) {
		const _result = configList.find(config => config[checkField] === handler) || [];

		return _result.length === 1 ? _result[0] : _result;
	}
};
