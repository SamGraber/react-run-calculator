var webpack = require('webpack');

module.exports = {
	debug: true,
	devtool: 'source-map',
	resolve: {
		extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
	},
	module: {
		loaders: [
			{ test: /\.tsx?$/, exclude: /node_modules/, loader: 'awesome-typescript-loader' },
		],
		preLoaders: [
			{ test: /\.js$/, loader: 'source-map-loader' },
		],
	},
};
