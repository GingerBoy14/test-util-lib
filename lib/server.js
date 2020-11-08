const express = require('express')
const cors = require('cors')
require('dotenv').config() //for custom environment variable
const { readLogFile } = require('./module/workWithFile')
const runTest = require('./runTests')

const app = express()
const PORT = process.env.NODE_PORT || 5000
app.use(cors()) //enable CORS

app.get('/getTests', (req, res) => {
  runTest()
  res.json(readLogFile())
})

app.listen(PORT, () => {
  console.log('API app started')
})
