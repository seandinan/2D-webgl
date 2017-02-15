var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, '../public/js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname + './../src'),

	devtool: 'eval',

	entry: {

		app: './entry.js'

	},

	output: {
		path: path.resolve(__dirname, '../public/js'),
		filename: '[name].bundle.js'
	},

	plugins: [],

	module: {
		loaders: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: [
					'style?sourceMap',
					'css?modules&importLoaders=1&localIdentName=[name]_[local]-[hash:base64:5]',
					'resolve-url',
					'sass?sourceMap'
				]
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'react', 'stage-0']
				}
			}
		]
	}
};
