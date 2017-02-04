var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//������һЩ�ļ��е�·��
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TMP_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
    //��Ŀ���ļ��� ����ֱ�����ļ������� Ĭ�ϻ���index.js Ҳ����ȷ�����ĸ��ļ�����
    entry: {
        //��������ļ���app, mobile�� vendors
        app: path.resolve(APP_PATH, 'index.js'),
        mobile: path.resolve(APP_PATH, 'mobile.js'),
        // ���Ҫ�����vendors����Ŀ�
        vendors: ['moment']
    },
    devtool: 'eval-source-map', //��������Source Maps��ѡ����ʵ�ѡ��
    //������ļ��� �ϲ��Ժ��js������Ϊbundle.js
    output: {
        path: BUILD_PATH,
        //ע�� �����޸���bundle.js ��һ������[name]�����棬
        // �������entry������ļ��������ɶ��js�ļ���
        // �������(app.js, mobile.js��vendors.js)
        filename: '[name].js'
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
        //����������HtmlWebpackPlugin��ʵ������������ҳ��
        new HtmlWebpackPlugin({
            title: 'Hello World app',
            template: path.resolve(TMP_PATH, 'index.html'),
            filename: 'index.html',
            //chunks����������߲��Ҫ����entry������ļ������
            chunks: ['app', 'vendors'],
            //Ҫ��script���뵽��ǩ��
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