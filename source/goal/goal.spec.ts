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

	describe('view', () => {
		beforeEach(() => {
			component.setState({});
		});

		it('should format the average pace as minutes and seconds', () => {
			component.setState({ averagePace: toDate(4.5) });

			const averagePaceParagraph = component.render().props.children[0];

			expect(averagePaceParagraph.props.children[0]).to.equal('Your current average pace is ');
			expect(averagePaceParagraph.props.children[1]).to.equal('4:30');
			expect(averagePaceParagraph.props.children[2]).to.equal(' minutes per mile');
		});

		it('should provide an input for the user to set a goal if none is set', () => {
			let input = getGoalInput(component);

			expect(input.props.type).to.equal('number');
			expect(input.props.id).to.equal('goal');
			expect(input.props.value).to.be.empty;

			component.setState({ pendingGoal: 2 });

			input = getGoalInput(component);

			expect(input.props.value).to.equal(2);

			function getGoalInput(component: any): any {
				const setPaceDiv = component.render().props.children[1];
				const formGroupDiv = setPaceDiv.props.children[1];
				return formGroupDiv.props.children[0].props.children;
			}
		});

		it('should show the user\'s goal if one is set', () => {
			component.setState({ goal: toDate(2.5) });

			const goalParagraph = component.render().props.children[2].props.children[0];

			expect(goalParagraph.props.children[0]).to.equal('Your goal is ');
			expect(goalParagraph.props.children[1]).to.equal('2:30');
			expect(goalParagraph.props.children[2]).to.equal(' minutes per mile');
		});

		it('should show the amount by which the user needs to improve to meet their goal', () => {
			component.setState({ 
				goal: toDate(2.5),
				averagePace: toDate(6),
			});

			const improvementParagraph = component.render().props.children[2].props.children[1];

			expect(improvementParagraph.props.children[0]).to.equal('To reach your goal, you will need to improve your average by ');
			expect(improvementParagraph.props.children[1]).to.equal('3:30');
			expect(improvementParagraph.props.children[2]).to.equal(' minutes per mile');
		});
	});
});
