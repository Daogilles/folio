// Webpack
const webpack = require('webpack');

// Modules
const path = require('path');
const dev = process.env.NODE_ENV !== 'production'
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin({
  filename: 'main.css',
  disable: dev
})

// Configuration
module.exports = {
    mode: dev ? 'development' : 'production',
    entry: path.resolve(__dirname, 'src/index.js'),
    entry: {
        main: ['babel-polyfill', path.resolve(__dirname, 'src/styles/main.scss') ,path.resolve(__dirname, 'src/index.js')]
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: ['.', 'node_modules'],
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            ["@babel/preset-env", {
                              "targets": {
                                "browsers": ["last 2 versions", "safari >= 7"]
                              },
                          }],
                        ],
                    }
                },
                exclude: [
                    ["/node_modules/"],
                    ["transform-es2015-classes"]
                ]
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
        new ExtractTextPlugin("main.css"),
    ]
}
