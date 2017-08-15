const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const projectConfig = require("./project.config.js")
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
    entry: {
        "app": "./src/main.js",
        "vue": ["vue"]
    },
    output: {
        path: projectConfig.remotePath,
        publicPath: projectConfig.publicPath,
        filename: "build.js",
        library: "[name]"
    },
    resolve: {
        modules: ["node_modules", "./src/components", "src/api"],
        extensions: [".js", ".vue", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader?name=[name].[hash:7].[ext]&outputPath=style/image/&publicPath=../&limit=10000"
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader?name=[name].[hash:7].[ext]&outputPath=style/font/&publicPath=../&limit=10000"
            },
            {
                enforce: "pre",
                test: /\.(vue|js)$/,
                loader: "eslint-loader",
                exclude: /node_modules/,
                options: {
                    formatter: require("eslint-friendly-formatter")
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    extractCSS: true,
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            use: ["css-loader", "postcss-loader", "sass-loader"],
                            fallback: "vue-style-loader"
                        }),
                        css: ExtractTextPlugin.extract({
                            use: ["css-loader", "postcss-loader"],
                            fallback: "vue-style-loader"
                        })
                    }
                }
            },
            {
                test: /.\js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
            uglifyOptions: {
                warnings: true,
                compress: {
                    dead_code: true,
                    drop_debugger: true
                }
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vue",
            filename: "vue.js"
        }),
        new ExtractTextPlugin({
            filename: "style/style.min.css",
            allChunks: true,
            disable: false
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: "./src/index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: "dependency"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new FriendlyErrorsWebpackPlugin()
    ]

}
