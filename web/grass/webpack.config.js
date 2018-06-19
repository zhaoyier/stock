const path = require('path');  
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');//导入生成html文件的插件  
const MiniCssExtractPlugin = require("mini-css-extract-plugin") //独立打包css文件插件  
  
//创建一个插件实例  
const htmlPlugin = new HtmlWebpackPlugin({  
    template: path.join(__dirname, 'src/templates/index.html'),//模板文件  
    filename: 'index.html'//生成文件名  
});

  
// const cssPlugin = new MiniCssExtractPlugin({//选项与htmlPlugin类似  
//     filename: "index.css"  
// })  
  
//向外暴露一个配置对象，commonjs规范（因为webpack是基于node构建）  
//webpack默认只能打包处理.js后缀的文件，像.jpg .vue等文件无法主动处理，所以需要配置第三方loader  
module.exports = {  
    mode: 'development', //development  production ( 生产环境会将代码压缩 )  
    //在webpack4中有一大特性是约定大于配置，默认打包入口路径是'src/index.js'，打包输出路径是'dist/main.js'  
		entry: path.resolve(__dirname, "./src/views/index.js"),
		output: {
			path: path.resolve(__dirname, "./dist"),
			filename: "[name].js"
		},
		plugins: [  
				htmlPlugin,
				new CleanWebpackPlugin(['dist']),
    ],
    module: {//第三方loader  
        rules: [  
            {  
                test: /\.(js|jsx)$/,  
                use: 'babel-loader',  
                exclude: /node_modules/ // 在使用babel-loader时候一定要加上exclude,排除node_modules文件夹   
            },  
            // 解析css文件    
            {  
                test: /\.css$/,  
                use: [MiniCssExtractPlugin.loader, 'css-loader']// use从右往左写    
            },  
            // 解析less    
            {  
                test: /\.less$/,  
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']  
            }  
        ]  
		},
		devServer:{
			// 设置服务器访问的基本目录
			contentBase:path.resolve(__dirname,'dist'), //最好设置成绝对路径
			// 设置服务器的ip地址,可以是localhost
			host:'localhost',
			// 设置端口
			port:8090,
			// 设置自动拉起浏览器
			open:true
		},
}