const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const projectConfig = require('./project.config.js');

// console.log('remote path: %s and %s', projectConfig.remotePath, path.isAbsolute(projectConfig.remotePath));

module.exports = {
    entry: {
        'app': './src/main.js',
        'vue': ['vue']
    },
    output: {
        path: projectConfig.remotePath,
        publicPath: projectConfig.publicPath,
        filename: 'build.js',
        library: '[name]'
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.vue']
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  extractCSS: true,
                  loaders: {
                    scss: ExtractTextPlugin.extract({
                      use: ['css-loader', 'sass-loader'],
                      fallback: 'vue-style-loader'
                    })
                  }
                }
            },
            {
                test: /.\js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                warnings: true,
                drop_console: true
            },
            comments: false,
            sourceMap: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug:false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vue',
            filename: 'vue.js'
        }),
        new ExtractTextPlugin("./style/style.css"),
        new HtmlWebpackPlugin({
            title: "Vue app",
            hash: true,
            template: "./src/index.html"
        })
    ]

}