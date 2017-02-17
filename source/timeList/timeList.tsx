import * as React from 'react';
import { lazyInject } from '../decorators';

import { TimeService } from '../services/time.service';
import { calculatePace, toDate, remove } from '../services/utility';

export interface IFormattedTimeEntry {
	id: number;
	pace: Date;
	time: Date;
	distance: number;
}

export class TimeList extends React.Component<any, { timeList: IFormattedTimeEntry[] }> {
	@lazyInject(TimeService) timeService: TimeService;

	componentWillMount(): void {
		this.timeService.getTimeList().then(data => this.setState({ timeList: data.map(this.setPace).map(this.formatTimes) }));
	}

	deleteTime(time: IFormattedTimeEntry): void {
		this.timeService.deleteTime(time as any).then(() => this.setState({ timeList: remove(this.state.timeList, time) }));
	}

	render(): JSX.Element {
		if (!this.state) {
			return null;
		}

		return (
			<ul className="list-group">
				{this.state.timeList.map(time => (
					<li className="list-group-item row" key={time.id}>
						<div className="col-xs-4 form-control-static">{time.distance} miles</div>
						<div className="col-xs-3 form-control-static">{time.time.toString()} minutes</div>
						<div className="col-xs-3 form-control-static">{time.pace.toString()} minutes per mile</div>
						<div className="col-xs-2"><button className="btn btn-danger" onClick={() => this.deleteTime(time)}>Remove</button></div>
					</li>
				))}
			</ul>
		);
	}

	private setPace(time: any) {
		return {
			id: time.id,
			pace: calculatePace(time),
			time: time.time,
			distance: time.distance,
		};
	}

	private formatTimes(time: any): IFormattedTimeEntry {
		return {
			id: time.id,
			pace: toDate(time.pace),
			time: toDate(time.time),
			distance: time.distance,
		};
	}
}
