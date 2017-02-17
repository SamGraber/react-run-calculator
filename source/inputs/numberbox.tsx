import * as React from 'react';

import { Inputbox } from './inputbox';

export interface NumberboxProps {
	id?: string;
	value: number;
	onChange: { (value: number): void };
	disabled?: boolean;
}

export const Numberbox = ({ onChange, ...params }: NumberboxProps) => (
	<Inputbox type="number"
			  {...params}
			  onChange={value => onChange(+value)} />
);
