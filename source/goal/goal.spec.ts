import { toDate } from '../services/utility';
import { Goal } from './goal';

describe('Goal', () => {
	let component: Goal;
	let goalService: any;
	let timeService: any;
	let goal: any;
	let averagePace: any;
	let pendingGoal: any;

	beforeEach(() => {
		goalService = { 
			getGoal: sinon.spy(),
			putGoal: sinon.spy(() => ({ then: (x: any) => x() })),
		};
		timeService = { getTimeList: sinon.spy() }
		component = new Goal();
		component.goalService = goalService;
		component.timeService = timeService;
		component.setState = (state: any) => {
			goal = state.goal !== undefined ? state.goal : goal;
			averagePace = state.averagePace;
			pendingGoal = state.pendingGoal;
			component.state = state;
		};
	});

	it('should get the goal and average time on init', () => {
		let initialGoal = 6;
		let initialTimeList = [{ time: 4, distance: 2 }];
		goalService.getGoal = sinon.spy(() => ({ then: (x: any) => x(initialGoal) }));
		timeService.getTimeList = sinon.spy(() => ({ then: (x: any) => x(initialTimeList) }));
		
		component.componentWillMount();

		sinon.assert.calledOnce(goalService.getGoal);
		sinon.assert.calledOnce(timeService.getTimeList);
		expect(goal).to.deep.equal(toDate(initialGoal));
		expect(averagePace).to.deep.equal(toDate(2));
	});
	
	it('should get the average pace minus the goal as a date', () => {
		component.setState({
			averagePace: new Date(3),
			goal: new Date(2),
		});

		let result = component.averageMinusGoal();

		expect(result).to.deep.equal(new Date(1));
	});
	
	it('should save the pending goal and set the goal value on the controller', () => {
		let newGoal = 3;
		component.setState({
			goal: null,
			pendingGoal: newGoal,
		});
		
		component.setGoal();

		sinon.assert.calledOnce(goalService.putGoal);
		expect(goalService.putGoal.firstCall.args[0]).to.equal(newGoal);
		expect(pendingGoal).to.be.null;
		expect(goal.getMinutes()).to.equal(newGoal);
	});
	
	it('should make a request to clear the goal and clear it on the controller', () => {
		component.clearGoal();

		sinon.assert.calledOnce(goalService.putGoal);
		expect(goalService.putGoal.firstCall.args[0]).to.be.null;
		expect(goal).to.be.null;
	});
});
