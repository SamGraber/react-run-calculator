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

	saveTime = (event: React.FormEvent<any>): void => {
		this.timeService.postTime(this.state.time).then(() => this.setState({ time: {} as any }));
		event.preventDefault();
	}

	setDistance = (event: React.ChangeEvent<{ value: string }>): void => {
		this.setState({ time: Object.assign({}, this.state.time, { distance: +event.target.value }) })
	}
	
	setTime = (event: React.ChangeEvent<{ value: string }>): void => {
		this.setState({ time: Object.assign({}, this.state.time, { time: +event.target.value }) })
	}

	render(): JSX.Element {
		if (!this.state) {
			return null;
		}
		
		return (
			<form onSubmit={this.saveTime}>
				<div className="form-group">
					<label htmlFor="distance">Distance</label>
					<div className="row">
						<div className="col-xs-6">
							<input className="form-control" type="number" id="distance" name="distance" value={this.state.time.distance || ''} onChange={this.setDistance} />
						</div>
						<div className="col-xs-6 form-control-static">miles</div>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="time">Time</label>
					<div className="row">
						<div className="col-xs-6">
							<input className="form-control" type="number" id="time" name="time"  value={this.state.time.time || ''} onChange={this.setTime} />
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
