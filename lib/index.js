const { writeLogFile, readLogFile } = require('./module/workWithFile')
const { output } = require('./module/cli')
const runTest = require('./runTests')
const { listToTree } = require('./helpers')
require('dotenv').config()

runTest()

output.showLog(readLogFile())
output.showQR()

const file = readLogFile()
const log = listToTree(file.log)

writeLogFile({ ...file, log })
