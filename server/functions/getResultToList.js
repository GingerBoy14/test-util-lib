const { readLogFile } = require('../../lib/module/workWithFile')
const runTest = require('../../lib/runTests')

const getResultToList = (res) => {
  runTest()
  res.json(readLogFile())
}

module.exports = getResultToList
