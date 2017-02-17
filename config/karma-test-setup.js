Error.stackTraceLimit = Infinity;

require('reflect-metadata');

window.expect = chai.expect;

var appContext = require.context('../source', true, /\.spec\.ts/);

appContext.keys().forEach(appContext);
