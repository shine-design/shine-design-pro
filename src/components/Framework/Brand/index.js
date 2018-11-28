/**
 * @Component 商标 - index
 * @Type 框架
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/25 14:11
 */
import {connect} from 'shiner';

import UI from './UI';

export default connect(
	({brand}) => {
		return {...brand};
	}
)(UI);
