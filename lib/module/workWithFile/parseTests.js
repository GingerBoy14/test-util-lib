const path = require('path')
const fs = require('fs')

const parseTest = (dir, files) => {
  files = files || []
  let fileSystem = fs.readdirSync(dir)
  for (let i in fileSystem) {
    let name = path.join(dir, fileSystem[i])
    if (fs.statSync(name).isDirectory()) {
      parseTest(name, files)
    } else {
      if (name.includes('.test.js')) files.push(name)
    }
  }
  return files
}

module.exports = parseTest
