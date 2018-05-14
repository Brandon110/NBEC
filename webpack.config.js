const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['env', 'react']
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
