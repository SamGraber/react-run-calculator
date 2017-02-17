import * as React from 'react';

export interface InputboxProps<T> {
	id: string;
	type: string;
	value: T;
	onChange: { (value: T): void };
	disabled?: boolean;
}

export const Inputbox = ({ id, value, onChange, ...params }: InputboxProps<any>) => (
	<input className="form-control"
		   value={value || ''}
		   {...params}
		   onChange={event => onChange(event.target.value)} />
);
