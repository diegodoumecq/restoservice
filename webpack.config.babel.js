import path from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import Autoprefixer from 'autoprefixer';

const port = 9002;
const bundleFolder = 'devBundle';
const binPath = path.resolve(__dirname, bundleFolder);
const mainPath = path.resolve(__dirname, 'src');
const staticPath = path.resolve(__dirname, 'static');

export default {
    devServer: {
        historyApiFallback: true,
        hot: true,
        port,
        contentBase: mainPath,
        host: '0.0.0.0'
    },

    performance: { hints: false },

    devtool: '#source-map',

    entry: path.resolve(mainPath, 'index.js'),

    output: {
        path: binPath,
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },

    module: {
        rules: [{
            test: /\.js/,
            rules: [{ loader: 'babel-loader' }],
            include: [mainPath]
        }, {
            test: /\.styl/,
            rules: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                query: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: [Autoprefixer]
                }
            }, {
                loader: 'stylus-loader',
                query: {
                    'resolve url': true,
                    sourceMap: true
                }
            }]
        }, {
            test: /\.css/,
            rules: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                query: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: [Autoprefixer]
                }
            }]
        }, {
            test: /.*\.(gif|png|jpe?g|svg)$/i,
            rules: [{
                loader: 'url-loader',
                options: {
                    limit: '10000',
                    mimetype: 'application/png'
                }
            }]
        }]
    },

    plugins: [
        new WriteFilePlugin(),

        new CleanWebpackPlugin([bundleFolder], {
            root: __dirname,
            verbose: true,
            dry: false
        }),

        new CopyWebpackPlugin([{ from: staticPath }])
    ]
};
