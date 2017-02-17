import * as React from 'react';

import { Inputbox } from './inputbox';

export interface NumberboxProps {
	id?: string;
	value: number;
	onChange: { (value: number): void };
	disabled?: boolean;
}

export const Numberbox = ({ id, value, onChange, disabled }: NumberboxProps) => (
	<Inputbox type="number"
			  id={id}
			  value={value}
			  onChange={value => onChange(+value)}
			  disabled={disabled} />
);
