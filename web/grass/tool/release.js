const git = require('simple-git')
const path = require('path')
const { EZPack } = require('@ezbuy/ezpack')
const AssetsPlugin = require('./AssetsPlugin.js')
const cpr = require('cpr')
const rimraf = require('rimraf')
const yargs = require('yargs')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

const argv = require('yargs')
	.number('env')
  .argv

function getEnv(){
  return isNaN(parseInt(argv.env, 10)) || parseInt(argv.env, 10) === 1 ? '' : `${argv.env}`
}

function getPubSitePath(isProd){
  const env = getEnv()
  const uatSellerSite = path.resolve(__dirname, `../../merchandiseToSeller_deployuat/ezseller${env}.65emall.net`)
  const prodSellerSite = path.resolve(__dirname, '../../ezseller.ezbuy.com')
  return isProd ? prodSellerSite : uatSellerSite
}

const getCurrentBranch = (function(){
  let promise = null
  return function getCurrentBranch(){
    if (promise === null) {
      promise = git.getCurrentBranch()
    }
    return promise
  }
})()

function isProd(){
  return getCurrentBranch().then((branch)=>(branch === 'master'))
}

function removeFiles(filePath){
  return new Promise(function(resolve, reject){
    rimraf(filePath,function(err){
      if (err) {
        reject(err)
      }else{
        resolve()
      }
    })
  })
}

function cprFiles(from, to){
  return new Promise(function(resolve, reject){
    cpr(from,to,{
      overwrite: true
    },function(err, files){
      if (err) {
        reject(err)
      }else{
        resolve(files)
      }
    })
  })
}

function build(){
  const options = require('../ezpack.config.js')
  if(!options.webpack.plugins.find((plugin)=>(plugin instanceof AssetsPlugin))){
    options.webpack.plugins.push(new AssetsPlugin({root: path.resolve(__dirname, '../src/resources')}))
    options.webpack.plugins.push(new HtmlWebpackInlineSourcePlugin())
  }
  const ezpack = new EZPack(options)
  return ezpack.build()
}
removeFiles(path.resolve(__dirname, '../dist')).then(function(){
  return build()
}).then(function(){
  return isProd().then(function(isProd){
    const siteRootDir = getPubSitePath(isProd)
    return git.clearGitRepo(siteRootDir).then(function(){
      return siteRootDir
    })
  })
}).then(function(rootDir){
  return Promise.all([
    cprFiles(path.resolve(__dirname, '../dist'), rootDir),
    cprFiles(path.resolve(__dirname, '../src/resources/asset'), path.resolve(rootDir, './asset')),
    cprFiles(path.resolve(__dirname, '../src/resources/static'), path.resolve(rootDir, './static')),
  ])
}).then(function(){
  return getCurrentBranch().then(function(branch){
    const isProd = branch === 'master'
    if (isProd) {
      return git.submitCommit(getPubSitePath(isProd), `Auto Publish From ${branch}`).then(function(){
        console.log('生产发布成功！')
        return true
      })
    }else{
      return git.submitCommit(getPubSitePath(isProd), `Seller Publish From ${branch}`).then(function(){
        console.log(`UAT ${getEnv()}发布成功！`)
        return true
      })
    }
  })
}).catch(function(err){
  console.error('发布失败')
  console.error(err)
})
