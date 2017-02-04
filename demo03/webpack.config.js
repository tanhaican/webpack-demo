/*
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项
  entry:  APP_PATH, //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以指定文件名字
  output: {
    path: BUILD_PATH, //打包后的文件存放的地方
    filename: 'bundle.js' //打包后输出文件的文件名
  },

  module: {
    loaders: [// npm install --save-dev json-loader
      { //在配置文件里添加JSON loader
        test: /\.json$/,
        loader: "json"
      }
    ]
  },

  plugins: [
	new HtmlwebpackPlugin({
		title: 'Hello world app'
	})
  ],

  devServer: { // npm install --save-dev webpack-dev-server
	contentBase: './build',//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新，
	hot: true
  }
};
*/

var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: {
        app: path.resolve(APP_PATH, 'index.js'),
        // 添加要打包在vendors里面的库
        vendors: ['moment']
    },
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