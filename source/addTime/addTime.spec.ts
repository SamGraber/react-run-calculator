import { AddTime } from './addTime';

describe('AddTime', () => {
	let component: AddTime;
	let timeService: any;
	let time: any;

	beforeEach(() => {
		timeService = { 
			postTime: sinon.spy(() => ({ then: (x: any) => x() })),
		};
		component = new AddTime();
		component.timeService = timeService;
		component.setState = (state: any) => {
			time = state.time;
			component.state = state;
		};
	});
	
	it('should save the current time entry and then clear it', () => {
		const newTime = { time: 2 };
		component.setState({ time: newTime as any });
		
		component.saveTime();

		sinon.assert.calledOnce(timeService.postTime);
		expect(timeService.postTime.firstCall.args[0]).to.equal(newTime);
		expect(time).to.be.empty;
	});
});
