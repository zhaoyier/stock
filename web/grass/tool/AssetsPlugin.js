const fse = require('fs-extra')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const urlRegexp = /^(https?:)?\/\//

const fileToHash = {}

function AssetsPlugin(options){
  this.webRoot = options.root
}

function getFileHash(filePath){
  const hash = crypto.createHash('md5')
  return hash.update(fs.readFileSync(filePath)).digest('hex').slice(0,10)
}

AssetsPlugin.prototype.apply = function(compiler){
  var self = this
  compiler.plugin('compilation', function(compilation) {

    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      const linkTagRegex = /<link.*?href=(["']?)(.*?)?\1.*?\/?>/mgi
      const scriptTagRegex = /<script.*?src=(["']?)(.*?)?\1.*?\/?>.*?<\/script>/mgi
      const originHTML = htmlPluginData.html
      const needReplaceArr = []
      let tagResult = linkTagRegex.exec(originHTML)

      while(tagResult !== null) {
        if (tagResult.length === 3) {
          needReplaceArr.push({
            originString: tagResult[0],
            path: tagResult[2]
          })
        }
        tagResult = linkTagRegex.exec(originHTML)
      }

      tagResult = scriptTagRegex.exec(originHTML)
      while(tagResult !== null) {
        if (tagResult.length === 3) {
          needReplaceArr.push({
            originString: tagResult[0],
            path: tagResult[2]
          })
        }
        tagResult = scriptTagRegex.exec(originHTML)
      }
      needReplaceArr.forEach(function(item){
        if (!urlRegexp.test(item.path)) {
          const itemPath = item.path.startsWith('/') ? `.${item.path}` : item.path
          const filePath = path.join(self.webRoot, itemPath)
          if (fse.pathExistsSync(filePath)) {
              let hash = fileToHash[filePath]
              if(typeof hash === 'undefined'){
                hash = getFileHash(filePath)
              }
              const ext = path.extname(itemPath)
              const newBaseName = path.basename(itemPath).replace(ext,`.${hash}${ext}`)
              const newFilePath = path.join(path.dirname(item.path), newBaseName)

              if (typeof fileToHash[filePath] === 'undefined') {
                const assetName = path.join(path.dirname(itemPath), newBaseName)
                const source = fs.readFileSync(filePath)


                compilation.assets[assetName] = {
                  source: () => source,
                  size: () => source.byteLength
                }
                fileToHash[filePath] = hash
              }

              htmlPluginData.html = htmlPluginData.html.replace(item.originString, item.originString.replace(item.path, newFilePath))
          }else{
            console.warn(`[warn] ${filePath} not found..`)
          }
        }
      })
      callback(null, htmlPluginData)
    })
  })
}

module.exports = AssetsPlugin
