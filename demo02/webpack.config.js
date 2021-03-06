﻿var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: APP_PATH,
    devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
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
    //添加我们的插件 会自动生成一个html文件
    plugins: [
        new HtmlwebpackPlugin({
            title: 'Hello World app'
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
};