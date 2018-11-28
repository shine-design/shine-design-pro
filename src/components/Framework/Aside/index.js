/**
 * @Component 侧边容器 - index
 * @Type 框架
 * @Author 开发团队 - team@shine.design
 * @Date 2018/11/26 15:43
 */
import {connect} from 'shiner';
import _ from 'lodash';
import UI from './UI';

export default connect(
	({base}) => {
		return {...base};
	}
)(UI);
