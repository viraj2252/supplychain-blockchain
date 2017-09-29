const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var website = {
    entry: './app/javascripts/app.js',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js'
    },
    plugins: [
        // Copy our app's index.html to the build folder.
        new CopyWebpackPlugin([
            { from: './app/index.html', to: "index.html" }
        ])
    ],
    node: {
        fs: "empty"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }],
        loaders: [
            { test: /\.json$/, use: 'json-loader' },
            { test: /\.js$/, loader: 'transform?brfs!' },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    }
};

var nodeapi = {
    entry: './app/javascripts/controllers/supplyController.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'test.js'
    }
};

module.exports = [website, nodeapi];