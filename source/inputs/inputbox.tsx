import * as React from 'react';

export interface InputboxProps<T> {
	id: string;
	type: string;
	value: T;
	onChange: { (value: T): void };
	disabled?: boolean;
}

export const Inputbox = ({ id, type, value, onChange, disabled }: InputboxProps<any>) => (
	<input type={type}
		   className="form-control"
		   value={value || ''}
		   onChange={event => onChange(event.target.value)}
		   disabled={disabled} />
);
