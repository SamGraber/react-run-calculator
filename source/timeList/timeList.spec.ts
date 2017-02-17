import { toDate } from '../services/utility';
import { TimeList } from './timeList';

describe('TimeList', () => {
	let component: TimeList;
	let timeService: any;
	let timeList: any[];

	beforeEach(() => {
		timeService = { 
			getTimeList: sinon.spy(),
			deleteTime: sinon.spy(() => ({ then: (x: any) => x() })),
		};
		component = new TimeList()
		component.timeService = timeService;
		component.setState = (state: any) => {
			timeList = state.timeList;
			component.state = state;
		};
	});

	it('should get the list of time entries', () => {
		let initialTimeList = [{ id: 11, time: 4, distance: 2 }];
		let expectedList = [{ id: 11, pace: toDate(2), time: toDate(4), distance: 2 }];
		timeService.getTimeList = sinon.spy(() => ({ then: (x: any) => x(initialTimeList) }));

		component.componentWillMount();
		
		sinon.assert.calledOnce(timeService.getTimeList);
		expect(timeList).to.deep.equal(expectedList);
	});
	
	it('should delete the time entry and remove it from the list', () => {
		component.setState({ timeList: <any>[1, 2, 3] });

		component.deleteTime(<any>2);

		sinon.assert.calledOnce(timeService.deleteTime);
		expect(timeList).to.deep.equal([1, 3]);
	});
});
