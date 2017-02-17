import * as React from 'react';

import { Inputbox } from './inputbox';

export interface TextboxProps {
	id: string;
	value: string;
	onChange: { (value: string): void };
	disabled?: boolean;
}

export const Textbox = ({ onChange, ...params }: TextboxProps) => (
	<Inputbox type="text"
			  {...params}
			  onChange={value => onChange(value)} />
);
