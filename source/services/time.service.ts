import { injectable } from 'inversify';

import { get, post, del } from './http';

export interface ITimeEntry {
	id: number;
	time: number;
	distance: number;
}

@injectable()
export class TimeService {
	getTimeList(): Promise<ITimeEntry[]> {
		return get('/time');
	}

	postTime(time: ITimeEntry): Promise<ITimeEntry> {
		return post('/time', time);
	}

	deleteTime(time: ITimeEntry): Promise<void> {
		return del(`/time/${time.id}`).then(() => null);
	}
}
