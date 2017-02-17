import * as React from 'react';
import { injectable } from 'inversify';
import { lazyInject } from '../decorators';

import { ITimeEntry, TimeService } from '../services/time.service';

export interface AddTimeState {
	time: ITimeEntry;
}

export class AddTime extends React.Component<any, AddTimeState> {
	state = { time: {} as any };

	@lazyInject(TimeService) timeService: TimeService;

	saveTime(): void {
		this.timeService.postTime(this.state.time).then(() => this.setState({ time: {} as any }));
	}

	render(): JSX.Element {
		if (!this.state) {
			return null;
		}
		
		return (
			// <form (ngSubmit)="saveTime()">
			<form>
				<div className="form-group">
					<label htmlFor="distance">Distance</label>
					<div className="row">
						<div className="col-xs-6">
							{/*<input className="form-control" type="number" id="distance" name="distance" [(ngModel)]="time.distance" />*/}
						</div>
						<div className="col-xs-6 form-control-static">miles</div>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="time">Time</label>
					<div className="row">
						<div className="col-xs-6">
							{/*<input className="form-control" type="number" id="time" name="time" [(ngModel)]="time.time" />*/}
						</div>
						<div className="col-xs-6 form-control-static">minutes</div>
					</div>
				</div>
				<div className="form-group">
					<button className="btn btn-primary" type="submit">Add time</button>
				</div>
			</form>
		);
	}
}
