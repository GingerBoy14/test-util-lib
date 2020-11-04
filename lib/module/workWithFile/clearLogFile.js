const fs = require('fs')

const clearLogFile = (fileName) => fs.writeFileSync(fileName, JSON.stringify([]))

module.exports = clearLogFile
