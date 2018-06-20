const fs = require("fs");
const path = require('path'); 
const Webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');//导入生成html文件的插件  
const MiniCssExtractPlugin = require("mini-css-extract-plugin") //独立打包css文件插件

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
        minify:{ collapseWhitespace: true},
        chunks: ['manifest', 'common', item],
        hash:true,
        inlineSource: 'manifest.*js$'
    })
})

module.exports = {
    mode: 'development', //development  production ( 生产环境会将代码压缩 )  
    entry: entries,
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name]-bundle.js"
    },
    plugins: plugins.concat(
        new CleanWebpackPlugin(['dist']), 
        new Webpack.HotModuleReplacementPlugin()
    ),
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
            open:true,
            // 设置热更新
            hot:true,
		},
}