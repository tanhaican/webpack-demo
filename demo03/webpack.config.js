/*
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//������һЩ�ļ��е�·��
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  devtool: 'eval-source-map', //��������Source Maps��ѡ����ʵ�ѡ��
  entry:  APP_PATH, //��Ŀ���ļ��� ����ֱ�����ļ������� Ĭ�ϻ���index.js Ҳ����ָ���ļ�����
  output: {
    path: BUILD_PATH, //�������ļ���ŵĵط�
    filename: 'bundle.js' //���������ļ����ļ���
  },

  module: {
    loaders: [// npm install --save-dev json-loader
      { //�������ļ������JSON loader
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
	contentBase: './build',//���ط����������ص�ҳ�����ڵ�Ŀ¼
    colors: true,//�ն���������Ϊ��ɫ
    historyApiFallback: true,//����ת
    inline: true,//ʵʱˢ�£�
	hot: true
  }
};
*/

var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//������һЩ�ļ��е�·��
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    //��Ŀ���ļ��� ����ֱ�����ļ������� Ĭ�ϻ���index.js Ҳ����ȷ�����ĸ��ļ�����
    entry: {
        app: path.resolve(APP_PATH, 'index.js'),
        // ���Ҫ�����vendors����Ŀ�
        vendors: ['moment']
    },
    devtool: 'eval-source-map', //��������Source Maps��ѡ����ʵ�ѡ��
    //������ļ��� �ϲ��Ժ��js������Ϊbundle.js
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
            {test: /\.(png|jpg)$/, loader: 'url?limit=40000'}// ͼƬ��СС������40000Bʱ�Զ�ʹ��base64����
        ]
    },
    //����jshint��ѡ�֧��es6��У��
    jshint: {
        "esnext": true
    },
    //������ǵĲ�� ���Զ�����һ��html�ļ�
    plugins: [
        //���ʹ��uglifyJsѹ�����js����
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        //������ļ��������������verdors.js
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