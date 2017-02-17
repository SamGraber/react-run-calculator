const baseUrl = 'http://localhost:3000';

export function get<T>(url: string, queryParams?: any): Promise<T> {
	const queryString = buildQueryString(queryParams);
	
	const request = new Request(baseUrl + url + queryString, {
		method: 'GET',
	});

	return fetch(request).then(onSuccess, onError);
}

export function post<T>(url: string, body?: any): Promise<T> {
	const request = new Request(baseUrl + url, {
		method: 'POST',
		body: JSON.stringify(body),
	});

	return fetch(request).then(onSuccess, onError);
}

export function put<T>(url: string, body?: any): Promise<T> {
	const request = new Request(baseUrl + url, {
		method: 'PUT',
		body: JSON.stringify(body),
	});

	return fetch(request).then(onSuccess, onError);
}

export function del(url: string): Promise<void> {
	const request = new Request(baseUrl + url, {
		method: 'DELETE',
	});

	return fetch(request).then(onSuccess, onError);
}

function buildQueryString(paramObject: any): string {
	if (!paramObject) {
		return '';
	}
	
	const paramNames = Object.keys(paramObject);
	const params = paramNames.map(name => `${name}=${encodeURIComponent(paramObject[name])}`);
	return `?${params.join('&')}`;
}

function onSuccess(response: any): any {
	if (!response.ok) {
		return onError(response);
	}
	
	return response.json();
}

function onError(error: any): void {
	console.log(error); // eslint-disable-line no-console
}
