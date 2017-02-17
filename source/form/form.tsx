import * as React from 'react';

export interface FormProps {
	onSubmit: { (): void };
	children?: JSX.Element | JSX.Element[];
}

function submitWithoutHtmlPost(event: React.FormEvent<any>, onSubmit: { (): void }): void {
	onSubmit();
	event.preventDefault();
}

export const Form = ({ onSubmit, children }: FormProps) => (
	<form onSubmit={event => submitWithoutHtmlPost(event, onSubmit)}>
		{children}
	</form>
);
