var merge = require( 'webpack-merge' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var BASE_CONFIG = require( './webpack.config' );
var path = require('path');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var DEV_PATH = path.resolve(ROOT_PATH, 'dev');
var TMP_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = merge(BASE_CONFIG, {
    devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: DEV_PATH,
        publicPath: DEV_PATH,
        //注意 我们修改了bundle.js 用一个数组[name]来代替，
        // 他会根据entry的入口文件名称生成多个js文件，
        // 这里就是(app.js, mobile.js和vendors.js)
        filename: '[name].[hash].js'
    },
    module: {
        preLoaders: [
            {test: /\.jsx?$/, include: APP_PATH, loader: 'jshint-loader'}
        ]
    },
    //配置jshint的选项，支持es6的校验
    jshint: {
        "esnext": true
    },
    //添加我们的插件 会自动生成一个html文件
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello app',
            template: path.resolve(TMP_PATH, 'index.html'),
            filename: 'index2.html',
            hash: true,
            cache: true
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
} );
