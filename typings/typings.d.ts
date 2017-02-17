/// <reference types="sinon" />

// Jasmine
declare var describe: any;
declare var it: any;
declare var beforeEach: any;
declare var afterEach: any;

// Chai globals
declare var expect: Chai.ExpectStatic;

// sinon global
declare var sinon: sinon.SinonStatic;

// fetch
declare const fetch: IFetch;

declare interface IFetch {
	(url: string): Promise<any>;
	(request: any): Promise<any>;
}

declare const Request: any;
declare const Headers: any;

declare interface Headers {}
