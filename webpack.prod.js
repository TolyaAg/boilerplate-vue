const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const projectConfig = require('./project.config.js');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// console.log('remote path: %s and %s', projectConfig.remotePath, path.isAbsolute(projectConfig.remotePath));

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
                warnings: false,
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
        new ExtractTextPlugin({ filename: "./style/style.css", allChunks: true }),
        new HtmlWebpackPlugin({
            hash: true,
            template: "./src/index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new FriendlyErrorsWebpackPlugin()
    ]

}
