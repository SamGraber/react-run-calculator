import * as React from 'react';
import { Link } from 'react-router';

export const Welcome = () => (
	<div>
		<h3>Welcome!</h3>
		<p><Link to="/addtime">Add time</Link> to begin.</p>
	</div>
);
