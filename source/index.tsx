import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, Link, browserHistory } from 'react-router';

import { App } from './app';
import { Welcome } from './welcome';
import { AddTime } from './addTime/addTime';
import { Goal } from './goal/goal';
import { TimeList } from './timeList/timeList';

import './ioc';

render(
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRedirect to="/home" />
			<Route path="home" component={Welcome} />
			<Route path="addtime" component={AddTime} />
			<Route path="goal" component={Goal} />
			<Route path="timelist" component={TimeList} />
		</Route>
	</Router>,
	document.getElementById('container')
);
