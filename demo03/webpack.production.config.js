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
    //������ļ��� �ϲ��Ժ��js������Ϊbundle.js
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.scss$/, loaders: ['style', 'css', 'sass'], include: APP_PATH},
            {test: /\.(png|jpg)$/, loader: 'url?limit=40000'}// ͼƬ��СС������40000Bʱ�Զ�ʹ��base64����
        ]
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
    ]
};