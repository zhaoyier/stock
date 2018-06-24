const fs = require('fs')
const path = require('path')
const dirRoot = path.resolve(__dirname, '../src')

function isDirectory(path) {
  const stats = fs.statSync(path)
  return stats.isDirectory()
}

module.exports = function(){
  return fs.readdirSync(dirRoot).filter((dir)=>{
    return !dir.startsWith('.') && !['resources'].includes(dir) && isDirectory(path.resolve(dirRoot,dir))
  }).map((dirname)=>(path.resolve(dirRoot,dirname)))
}
