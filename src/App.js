import React, {Component} from 'react';
import {routeFactory} from './routers';

class App extends Component {
	render() {
		return (
			<div className="App">
				{routeFactory(this.props)}
			</div>
		);
	}
}

export default App;
