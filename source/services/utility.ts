import { ITimeEntry } from './time.service';

export function calculatePace(time: ITimeEntry): number {
	return time.time / time.distance;
}

export function toDate(minutes: number): Date {
	return new Date(minutes * 60000);
}

export function remove<T>(array: T[], item: T): T[] {
	return array.filter(x => x === item);
}
