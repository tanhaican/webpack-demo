var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TMP_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: {
        //三个入口文件，app, mobile和 vendors
        app: path.resolve(APP_PATH, 'index.js'),
        mobile: path.resolve(APP_PATH, 'mobile.js'),
        // 添加要打包在vendors里面的库
        vendors: ['moment']
    },
    devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: BUILD_PATH,
        //注意 我们修改了bundle.js 用一个数组[name]来代替，
        // 他会根据entry的入口文件名称生成多个js文件，
        // 这里就是(app.js, mobile.js和vendors.js)
        filename: '[name].[hash].js'
    },
    module: {
        preLoaders: [
            {test: /\.jsx?$/, include: APP_PATH, loader: 'jshint-loader'}
        ],
        loaders: [
            {test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap'], include: APP_PATH},
            {test: /\.(png|jpg)$/, loader: 'url?limit=40000'}// 图片大小小于限制40000B时自动使用base64编码
        ]
    },
    //配置jshint的选项，支持es6的校验
    jshint: {
        "esnext": true
    },
    //添加我们的插件 会自动生成一个html文件
    plugins: [
        //这个使用uglifyJs压缩你的js代码
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        //创建了两个HtmlWebpackPlugin的实例，生成两个页面
        new HtmlWebpackPlugin({
            title: 'Hello World app',
            template: path.resolve(TMP_PATH, 'index.html'),
            filename: 'index.html',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['app', 'vendors'],
            //要把script插入到标签里
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            title: 'Hello Mobile app',
            template: path.resolve(TMP_PATH, 'mobile.ejs'),
            filename: 'mobile.html',
            chunks: ['mobile', 'vendors'],
            inject: 'body'
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
};
