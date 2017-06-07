const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: { 'app': './src/main.js' },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'build.js'
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

    devServer: {
        host: 'localhost',
        port: 8080,
        hot: true,
        compress: true,
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        overlay: {
            warnings: true,
            errors: true
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        contentBase: path.resolve(__dirname, './dist')
    },

    devtool: 'source-map',

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("./style/style.css")
    ]

}
