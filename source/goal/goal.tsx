import * as React from 'react';
import { lazyInject } from '../decorators';

import { GoalService } from '../services/goal.service';
import { TimeService, ITimeEntry } from '../services/time.service';
import { calculatePace, toDate } from '../services/utility';

export interface GoalState {
	goal: Date;
	averagePace: Date;
	pendingGoal: number;
}

export class Goal extends React.Component<any, GoalState> {
	@lazyInject(GoalService) goalService: GoalService;
	@lazyInject(TimeService) timeService: TimeService;

	componentWillMount(): void {
		this.goalService.getGoal().then(goal => this.setState({ goal: goal ? toDate(goal) : null }));
		this.timeService.getTimeList().then(timeList => this.setState({ averagePace: toDate(this.average(timeList)) }));
	}

	averageMinusGoal(): Date {
		if (!this.state.averagePace || !this.state.goal) {
			return new Date(0);
		}

		return new Date(this.state.averagePace.getTime() - this.state.goal.getTime());
	}

	setGoal(): void {
		this.goalService.putGoal(this.state.pendingGoal).then(() => {
			this.setState({
				goal: toDate(this.state.pendingGoal),
				pendingGoal: null,
			});
		});
	}

	clearGoal(): void {
		this.goalService.putGoal(null).then(() => this.setState({ goal: null }));
	}

	render(): JSX.Element {
		if (!this.state) {
			return null;
		}
		
		return (
			<div>
				<p>Your current average pace is {this.state.averagePace.toString()} minutes per mile</p>
				{!this.state.goal ?
					<div>
						<p>What is your desired pace?</p>
						<div className="form-group row">
							<div className="col-xs-6">
								{/*<input className="form-control" type="number" id="goal" [(ngModel)]="pendingGoal" />*/}
							</div>
							<div className="col-xs-6 form-control-static">minutes per mile</div>
						</div>
						<div className="form-group">
							<button className="btn btn-primary" onClick={this.setGoal}>Set goal</button>
						</div>
					</div>
				: null }
				{!!this.state.goal ?
					<div>
						<p>Your goal is {this.state.goal.toString()} minutes per mile</p>
						<p>To reach your goal, you will need to improve your average by {this.averageMinusGoal().toString()} minutes per mile</p>
						<div className="form-group">
							<button className="btn btn-danger" onClick={this.clearGoal}>Clear goal</button>
						</div>
					</div>
				: null}
			</div>
		);
	}

	private average(timeList: ITimeEntry[]) {
		const total = timeList.reduce((accum, time) => accum + calculatePace(time), 0);
		return total / timeList.length;
	}
}