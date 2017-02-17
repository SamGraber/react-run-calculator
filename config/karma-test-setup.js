Error.stackTraceLimit = Infinity;

window.expect = chai.expect;

var appContext = require.context('../source', true, /\.spec\.ts/);

appContext.keys().forEach(appContext);
