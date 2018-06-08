// import webpack from 'webpack';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import autoprefixer from 'autoprefixer';
// import path from 'path';

// Variables
// const outputPath = './build'
const assetPath = './src'
const dev = process.env.NODE_ENV !== 'production'

// Dependencies
const webpack = require('webpack');
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin({
  filename: 'main.css',
  disable: dev
})
const HtmlWebpackPlugin = require('html-webpack-plugin')

// The brain
const config = {
    // context: path.resolve(__dirname, 'src'),
    // devtool: 'inline-source-map',
    // entry: {
    //     cmp: './index.js',
    // },
    entry: {
        main: [`./src/styles/main.scss`, `./src/index.js`]
    },
    mode: dev ? 'development' : 'production',
    // devtool: dev ? 'cheap-module-eval-source-map' : false,
    // devServer: {
    //     contentBase: './',
    //     historyApiFallback: true,
    //     inline: true,
    //     open: true,
    //     hot: true,
    //     // port: 3001
    // },
    devServer: {
		port: 8080,
		host: 'localhost',
		publicPath: '/',
		contentBase: './src',
		historyApiFallback: true,
		disableHostCheck: true,
		open: true,
		https: false
	},
    // watch: true,
    // output: {
    //     path: path.resolve(__dirname, outputPath),
    //     filename: 'bundle.js',
    //     publicPath: dev ? `http://localhost:8080/` : '/'
    // },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: './',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '~': path.resolve('node_modules')
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
                test: /\.scss$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: !dev,
                                sourceMap: dev
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                minimize: !dev,
                                sourceMap: dev
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                minimize: !dev,
                                sourceMap: dev
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./style.css'),
        new HtmlWebpackPlugin({
            filename: './src/index.html',
            template: './src/index.html',
            chunks: ['main']
        }),
    ]
    // plugins: [
    //     extractCSS
    // ]
}

// Env specific plugins
// if (dev) {
//   config.plugins.push(new BundleAnalyzerPlugin({openAnalyzer: false}))// default port 8888
// } else {
//   config.plugins.push(new ManifestPlugin())
// }

module.exports = config
