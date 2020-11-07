const { readLogFile } = require('./module/workWithFile')
const { output } = require('./module/cli')
const runTest = require('./runTests')

require('dotenv').config()

const PORT = process.env.NODE_PORT || 8000
runTest()
console.log(PORT)
output.showLog(readLogFile())
output.showQR()
