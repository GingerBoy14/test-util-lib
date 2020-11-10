const express = require('express')
const cors = require('cors')
require('dotenv').config() //for custom environment variable
const { readLogFile, writeLogFile } = require('./module/workWithFile')
const runTest = require('./runTests')
const { listToTree } = require('./helpers')
const app = express()
const PORT = process.env.NODE_PORT || 5000
app.use(cors()) //enable CORS

app.get('/getTestsTree', (req, res) => {
  runTest()
  const file = readLogFile()
  const log = listToTree(file.log)

  writeLogFile({ ...file, log })

  res.json({ ...file, log })
})
app.get('/getTestsList', (req, res) => {
  runTest()
  res.json(readLogFile())
})

app.listen(PORT, () => {
  console.log('API app started')
})
