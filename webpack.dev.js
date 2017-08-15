const webpack = require("webpack")
const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        "app": "./src/main.js",
        "vue": ["vue"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "",
        filename: "build.js",
        library: "[name]"
    },
    resolve: {
        modules: ["node_modules", "src/components", "src/api"],
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

    devServer: {
        host: "localhost",
        port: 8080,
        hot: true,
        compress: true,
        historyApiFallback: true,
        noInfo: false,
        stats: "minimal",
        overlay: {
            warnings: true,
            errors: true
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        contentBase: path.join(__dirname, "./dist"),
        open: true
    },

    devtool: "source-map",

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: "style/style.min.css",
            allChunks: true,
            disable: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vue",
            filename: "vue.js",
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: "./src/index.html",
            inject: true
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    ]

}
