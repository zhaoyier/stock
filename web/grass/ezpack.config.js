const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const findTSAndJSDirs = require('./tool/findTSAndJSDirs')
const { validateConfig } = require('@ezbuy/ezpack')
const webpack = require('webpack')

const devPort = '8090'

const dirRoot = path.resolve(__dirname, './src')
const isAnalyzer = parseInt(process.env.ANALYZER, 10) === 1
const apiPath = path.join(dirRoot, "services");
const ticketPath = path.join(dirRoot, "component/Ticket");

const entry = fs.readdirSync(path.resolve(dirRoot, './view')).reduce(function(pValue, cValue){
  if (/\.[jt]sx?$/.test(cValue)) {
    const entryName = path.basename(cValue, path.extname(cValue))
    pValue[entryName] = ['whatwg-fetch', path.resolve(dirRoot, `./view/${cValue}`)]
  }
  return pValue
}, {})
const plugins = Object.keys(entry).map(entry => {
  let tplPath = path.resolve(dirRoot, `./resources/template/${entry}.html`)
  if (!fs.existsSync(tplPath)) {
    tplPath = path.resolve(dirRoot, './resources/template/base.html')
  }
  return new HtmlWebpackPlugin({
    template: tplPath,
    filename: `${entry}.html`,
    chunks: ['manifest', 'common', entry],
    inlineSource: 'manifest.*js$'
  })
})

const contentBase = ['static','asset'].map((dir)=>(
  {
    prefix: `/${dir}`,
    path: path.resolve(dirRoot, `./resources/${dir}`)
  }
))

const dirsTsAndJs = findTSAndJSDirs()

module.exports = validateConfig({
	name: 'Seller Back Stage',
	disableEntrySelect: true,
	webpack: {
		rootPath: dirRoot,
    tsInclude: dirsTsAndJs,
    jsInclude: dirsTsAndJs,
    entry,
		dllEntry: {
			vendors: [
        'babel-polyfill',
				'fetch.io',
				'js-cookie',
        'jquery',
        'react',
        'react-dom',
				'moment',
				'query-string',
        'redux',
        'react-router',
				'redux-action',
				'react-redux',
        'redux-thunk',
        'whatwg-fetch',
        'jsbarcode',
        'draft-js'
      ],
      reactEcharts: ['echarts-for-react'],
			antd: require('./tool/antdModules.json'),
			antdStyle: ['antd/dist/antd.min.css']
    },
    externals: {
      linkData: 'linkData'
    },
    outputPath: path.resolve(__dirname, './dist'),
    cdnPath: '/',
    cssModulePath: {
      // 需要使用css module的目录
      include: [`${dirRoot}/component/productManagement`],
    },
		cssGlobalPath: {
      include: [dirRoot],
      exclude: [`${dirRoot}/component/productManagement`]
		},
		extractCSS: false,
    plugins: isAnalyzer ? plugins.concat(new BundleAnalyzerPlugin()) : plugins,
  },
  devServer: {
    contentBase,
    port: devPort,
    initEntry: ['index','signin'],
    defaultProxyOrigin: {
			webapi: "webapi.sg.65emall.net"
		},
		apiDefPath: apiPath
  }
})
