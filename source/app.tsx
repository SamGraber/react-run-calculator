import * as React from 'react';
import { Link } from 'react-router';

export const App = ({ children }: { children: JSX.Element }) => (
	<div className="container">
		<nav className="navbar">
			<div className="navbar-header">
				<Link className="navbar-brand" to="/home">Running calculator</Link>
			</div>
			<ul className="nav navbar-nav">
				<li><Link to="/timelist">Time list</Link></li>
				<li><Link to="/addtime">Add time</Link></li>
				<li><Link to="/goal">Goal</Link></li>
			</ul>
		</nav>
		{children}
	</div>
);
