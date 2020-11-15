const { readLogFile, writeLogFile } = require('../../lib/module/workWithFile')
const runTest = require('../../lib/runTests')
const { listToTree } = require('../../lib/helpers')

const getResultToTree = (res) => {
  runTest()
  const file = readLogFile()
  const log = listToTree(file.log)

  writeLogFile({ ...file, log })

  res.json({ ...file, log })
}

module.exports = getResultToTree
