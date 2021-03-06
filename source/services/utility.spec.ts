import { calculatePace, toDate, remove } from './utility';

describe('utility', () => {
	describe('calculatePace', () => {
		it('should calculate pace as time divided by distance', () => {
			expect(calculatePace(<any>{ time: 4, distance: 2 })).to.equal(2);
			expect(calculatePace(<any>{ time: 2, distance: 2 })).to.equal(1);
			expect(calculatePace(<any>{ time: 1, distance: 2 })).to.equal(0.5);
		});
	});

	describe('toDate', () => {
		it('should convert to a date using the number of minutes', () => {
			expect(toDate(10).getMinutes()).to.equal(10);
			expect(toDate(5).getMinutes()).to.equal(5);
		});
	});
	
	describe('remove', () => {
		it('should remove the item from the array', () => {
			const array = [1, 2, 3];
			const expectedResult = [1, 3];

			const result = remove(array, 2);

			expect(result).to.deep.equal(expectedResult);
		});
	});
});
