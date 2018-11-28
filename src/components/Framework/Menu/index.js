/**
 * @Component 导航菜单 - index
 * @Type 框架
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/27 11:12
 */
import {connect} from 'shiner';
import _ from 'lodash';
import UI from './UI';

export default connect(
	({base, aside}) => {
		return {base, aside};
	}
)(UI);
