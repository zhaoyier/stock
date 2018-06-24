const fs = require('fs')
const path = require('path')

const findAntdModules = require('find-antd-modules')
const findTSAndJSDirs = require('./findTSAndJSDirs')

const time = new Date()
findAntdModules(findTSAndJSDirs()).then((modules) => {
  fs.writeFileSync(path.resolve(__dirname, './antdModules.json') ,JSON.stringify(modules))
  console.log(`Total ${modules.length} modules.`)
})
