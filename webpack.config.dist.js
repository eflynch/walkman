var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

var BUILD_DIR = path.resolve(__dirname, 'lib')
var APP_DIR = path.resolve(__dirname, 'src')

var config = {
    entry: APP_DIR + '/walkman.js',
    output: {
        path: BUILD_DIR,
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            }
        ]
    },
    plugins: [
        new WebpackNotifierPlugin(),
    ]
};

module.exports = config;
