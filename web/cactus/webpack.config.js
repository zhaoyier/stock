const path = require("path");
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		app: path.resolve(__dirname, "./src/app.js")
	},
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, './dist'),
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				loader: 'babel-loader',
				exclude: [path.join(__dirname, "./node_modules")]
			}
		]
	},
	plugins: [
		new HTMLPlugin({
			template: path.resolve(__dirname, "./src/templates/index.html")
		})
	]
}