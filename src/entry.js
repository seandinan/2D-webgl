import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, Link, IndexRedirect } from 'react-router';

const container = (props) => (
	<div style={{height: '100%', width: '100%', overflow: 'hidden' }}>
		{props.children}
	</div>
);

const error = () => (
	<div style={{marginTop: '5%', textAlign: 'center'}}>
		Whoops! Took a wrong turn.<br />
		<Link to="/">Let's go home.</Link>
	</div>
);

/* REPLACE WITH YOUR INDEX ROUTE */
const Placeholder = () => (
	<div style={{marginTop: '5%', fontSize: '30px', color: 'hsl(0, 0%, 33%)', textAlign: 'center'}}>
		Rex app is up n running!
	</div>
);

const Routing = () => (
	<Router history={browserHistory}>
		<Route path="/" component={container}>
			 <IndexRoute component={Placeholder} />
		</Route>

		<Route path="*" component={error} />
	</Router>
);

ReactDOM.render(<Routing />, document.getElementById('app'));



