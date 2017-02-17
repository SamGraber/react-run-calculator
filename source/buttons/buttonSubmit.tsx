import * as React from 'react';

const buttonClassPrefix: string = 'btn-';
const defaultButtonType: string = 'default';

export function configureSize(size: string): string {
	return size != null && size !== ''
		? buttonClassPrefix + size
		: null;
}

export function configureTypes(type: string): string {
	type = type || defaultButtonType;
	let typesList: string[] = type.split(' ');
	typesList.forEach((type: string, index: number): void => {
		//the for each for places that used btn-block for example in the type attribute do not break
		if (type.indexOf(buttonClassPrefix) === -1) {
			type = buttonClassPrefix + type;
		}
		typesList[index] = type;
	});
	return typesList.join(' ');
}

export interface ButtonSubmitProps {
	type: string;
	children?: JSX.Element | JSX.Element[];
}

export const ButtonSubmit = ({ type, children }: ButtonSubmitProps) => (
	<button type="submit" className={`btn ${configureTypes(type)}`}>
		{children}
	</button>
);
