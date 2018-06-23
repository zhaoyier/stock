const fs = require("fs");
const path = require('path');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const entries = fs.readdirSync(path.resolve(__dirname, "./src/views")).reduce((total, current) => {
  if (/\.[jt]sx?$/.test(current)) {
      const name = path.basename(current, path.extname(current))
      console.log("====>>101:", name, current, total);
      total[name] = ["whatwg-fetch", path.resolve(__dirname, `./src/views/${current}`)]
  }
  return total
}, {})

const plugins = Object.keys(entries).map(item => {
  let tpl = path.resolve(__dirname, `./src/templates/${item}.html`)
  if (!fs.existsSync(tpl)) {
      tpl = path.resolve(__dirname, "./src/templates/base.html")
  }
  return new HtmlWebpackPlugin({
      template: tpl,
      filename: `${item}.html`,
      minify:{ collapseWhitespace: false},  //生成文件是否压缩
      chunks: ['app', 'commons', 'ramda', item],
      hash:true,
      inlineSource: 'manifest.*js$'
  })
})

module.exports = {
	entry: entries,
	output: {
		filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					'postcss-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
							javascriptEnabled: true,
							modifyVars: {
								'primary-color': '#531dab',
							},
						}
					}
				]
			},
		]
  },
  plugins: plugins.concat(
    new UglifyJSPlugin(),
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
  })
  ),
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'commons',
					priority: 10,
					chunks: 'initial'
				},
				styles: {
					name: 'styles',
					test: /\.(css|less)$/,
					chunks: 'all',
					minChunks: 2,
					enforce: true
				}
			}
		}
  },
  devServer:{
    // 设置服务器访问的基本目录
    contentBase:path.resolve(__dirname,'dist'), //最好设置成绝对路径
    // 设置服务器的ip地址,可以是localhost
    host:'localhost',
    // 设置端口
    port:8090,
    // 设置自动拉起浏览器
    open:true,
    // 设置热更新
    hot:true,
  },
};
