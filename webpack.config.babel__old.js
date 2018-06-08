import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = ENV !== 'production';

const uglifyPlugin = new UglifyJsPlugin({
	cache: true,
	parallel: true,
	uglifyOptions: {
		compress: false,
		ecma: 6,
		mangle: true
	},
	sourceMap: true
	});

const commonConfig = {
	context: path.resolve(__dirname, 'src'),
	resolve: {
		extensions: ['.js', '.json', '.scss'],
		modules: [
			path.resolve(__dirname, 'node_modules'),
			'node_modules'
		],
		alias: {
			style: path.resolve(__dirname, 'src/styles')
		}
	},

	module: {
		rules: [
			{
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
			{
				// Transform our own .(less|css) files with PostCSS and CSS-modules
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: CSS_MAPS,
							importLoaders: 1,
							minimize: true,
							localIdentName: '[name]_[local]--[hash:base64:5]'
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: CSS_MAPS,
							plugins: () => {
								autoprefixer({ browsers: ['last 2 versions'] });
							}
						}
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: CSS_MAPS }
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: CSS_MAPS }
					}
				]
			}
		]
	},

	stats: { colors: true },

	node: {
		global: true,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	},

	devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

	devServer: {
		port: process.env.PORT || 8080,
		host: 'localhost',
		publicPath: '/',
		contentBase: './src',
		historyApiFallback: true,
		disableHostCheck: true,
		open: true,
		https: false
	}
};

module.exports = [
	// CMP config
	{
		entry: {
			cmp: './index.js',
		},

		output: {
			path: path.resolve(__dirname, 'build'),
			publicPath: './',
			filename: '[name].bundle.js'
		},
		...commonConfig,
		plugins: ([
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(ENV)
			}),
			new webpack.ProvidePlugin({
				'Promise': 'promise-polyfill'
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'index.html',
				chunks: ['cmp']
			}),
		]).concat(ENV === 'production' ? uglifyPlugin : []),
	}
];
