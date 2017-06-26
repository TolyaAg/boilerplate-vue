const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


module.exports = {
    entry: {
        'app': './src/main.js',
        'vue': ['vue']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
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
                        }),
                        css: ExtractTextPlugin.extract({
                            use: ['css-loader'],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /.\js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
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
        contentBase: path.join(__dirname, './dist'),
        quiet: true
    },

    devtool: 'source-map',

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({ filename: "./style/style.css", allChunks: true }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vue',
            filename: 'vue.js'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: "./src/index.html",
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new FriendlyErrorsWebpackPlugin()
    ]

}
