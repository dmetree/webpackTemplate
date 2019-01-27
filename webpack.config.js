const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "./css/style.css"
});

module.exports = {
    entry: [
        './assets/js/index.js',
        './assets/scss/style.scss'
    ],
    output: {
        filename: './js/bundle.js',
        /*path: path.resolve(__dirname, './js/')*/
        path: path.resolve(__dirname, './dist/')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true,
                                sourceMap: true,
                                url: false
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['ie >= 8', 'last 4 version']
                                    })
                                ],
                                sourceMap: true
                            }
                        },
                        /*{
                            loader: "resolve-url-loader", options: {
                                keepQuery: true,
                                sourceMap: true
                            }
                        },*/
                        {
                            loader: "sass-loader", options: {
                                sourceMap: true
                            }
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            /*{
                test: /\.woff?$|\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                exclude: [/images/],
                use: [{
                    loader: "file-loader",
                    options: {
                        /!*name: 'public/fonts/[name].[ext]',
                        publicPath: function(url) {
                            return url.replace(/public/, '..')
                        },*!/
                        name: './fonts/[name].[ext]',
                        publicPath: function(url) {
                            return url.replace(/.\//, '../')
                        }
                    },
                }]
            }*/
        ]
    },
    plugins: [
        extractSass,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};
