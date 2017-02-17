import * as React from 'react';

import { Inputbox } from './inputbox';

export interface TextboxProps {
	id: string;
	value: string;
	onChange: { (value: string): void };
	disabled?: boolean;
}

export const Textbox = ({ id, value, onChange, disabled }: TextboxProps) => (
	<Inputbox type="text"
			  id={id}
			  value={value}
			  onChange={value => onChange(value)}
			  disabled={disabled} />
);
