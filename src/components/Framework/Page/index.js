/**
 * @Component 顶层容器 - index
 * @Type 页面框架
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/23 23:02
 */
import {connect} from 'shiner';

import UI from './UI';

export default connect(
	({page, header, aside, base}) => {
		return {page, header, aside, base};
	}
)(UI);
