import { injectable } from 'inversify';

import { get, put } from './http';

@injectable()
export class GoalService {
	getGoal(): Promise<number> {
		return get<{ goal: number }>('/goal').then(data => data.goal);
	}

	putGoal(goal: number): Promise<number> {
		return put<{ goal: number }>('/goal', { goal }).then(data => data.goal);
	}
}
