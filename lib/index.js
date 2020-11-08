const { readLogFile } = require('./module/workWithFile')
const { output } = require('./module/cli')
const runTest = require('./runTests')

require('dotenv').config()

runTest()

output.showLog(readLogFile())
output.showQR()
