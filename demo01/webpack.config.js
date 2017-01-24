module.exports = {
  devtool: 'eval-source-map', //��������Source Maps��ѡ����ʵ�ѡ��
  entry:  __dirname + '/app/main.js', //�Ѷ���ἰ��Ψһ����ļ�
  output: {
    path: __dirname + '/public', //�������ļ���ŵĵط�
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
  
  devServer: { // npm install --save-dev webpack-dev-server
	contentBase: './public',//���ط����������ص�ҳ�����ڵ�Ŀ¼
    colors: true,//�ն���������Ϊ��ɫ
    historyApiFallback: true,//����ת
    inline: true//ʵʱˢ��
  }
}