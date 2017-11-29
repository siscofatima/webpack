var webpack = require('webpack');

var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  //entry: APP_PATH,
  entry: {
    //三个入口文件，app, mobile和 vendors
    app: path.resolve(APP_PATH, 'index.js'),
    mobile: path.resolve(APP_PATH, 'mobile.js'),
    //添加要打包在vendors里面的库
    vendors: ['jquery', 'moment']
  },
  //output file name, by default it is bundle.js
  output: {
    path: BUILD_PATH,
    //注意 我们修改了bundle.js 用一个数组[name]来代替，他会根据entry的入口文件名称生成多个js文件，这里就是(app.js,mobile.js和vendors.js)
    filename: '[name].js'
  },
  //enable dev source map
  devtool: 'eval-source-map',
  //enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    // Open http://localhost:8082/sap/fpa/ui/app.html to launch local Orca server
    proxy: {
      '/orca': {
          target: 'http://localhost:8080/sap/fpa/ui/app.html', 
          secure: false
      },
      '/sap/*': {
          target: 'http://localhost:8080/', 
          secure: false
      },
    },
    progress: true
  },
  module: {
    /*rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'jshint-loader'
      }
    ],*/
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader', 
        include: APP_PATH,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?sourceMap','sass-loader?sourceMap'], //Webpack 2开始不能省略“-loader”，loaders用数组方式定义
        include: APP_PATH
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=40000'
      }
    ]
  },
  plugins: [
    // new HtmlwebpackPlugin({
    //   title: 'Hello World app'
    // }),
    //创建了两个HtmlWebpackPlugin的实例，生成两个页面
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['app', 'vendors'],
      //要把script插入到标签里
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: 'Hello Mobile app',
      template: path.resolve(TEM_PATH, 'mobile.html'),
      filename: 'mobile.html',
      chunks: ['mobile', 'vendors'],
      inject: 'body'
    }),
    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin({name:'vendors', filename:'vendors.js'}),
    //provide $, jQuery and window.jQuery to every script
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery", "window.jQuery": "jquery"
    })
  ]
};