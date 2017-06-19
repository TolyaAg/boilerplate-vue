const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


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
                test: /\.woff(2)?(\?)?(\d+)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?)?(\d+)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader?name=images/[name].[ext]'
                    }
                ]
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
        contentBase: path.join(__dirname, './dist')
    },

    devtool: 'source-map',

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("./style/style.css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vue',
            filename: 'vue.js'
        }),
        new HtmlWebpackPlugin({
            title: "Vue app",
            hash: true,
            template: "./src/index.html"
        })
    ]

}
