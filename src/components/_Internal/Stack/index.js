/**
 * @Component 表格布局 - index
 * @Type 布局
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/25 10:35
 */
import {connect} from 'shiner';
import _ from 'lodash';
import UI from './UI';

export default connect(
	({base}, ownProps) => {
		return {mode: _.isUndefined(ownProps.mode) ? base.mode : ownProps.mode};
	}
)(UI);
