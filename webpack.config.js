let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack           = require('webpack');

let config = {
    entry: ['smooth-scroll', './js/plugins.js', './js/main.js', ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']},
            {
                test: /\.hbs$/,
                use: [{
                    loader: 'handlebars-loader',
                    options: {helperDirs: path.resolve(__dirname, './js/helpers')}
                }]
            }
        ],
        loaders: [
            {test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, loader: 'file'}
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyWebpackPlugin([
            {from: 'images', to: 'images'},
            {from: 'js/hbs', to: 'js/hbs'},
            {from: 'js/json', to: 'js/json'}
        ])
    ],
};
if(process.env.NODE_ENV === 'production'){
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = config;
