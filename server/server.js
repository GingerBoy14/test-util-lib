const express = require('express')
const cors = require('cors')
require('dotenv').config() //for custom environment variable
const getTests = require('./routes')

const app = express()
const PORT = process.env.NODE_PORT || 5000
app.use(cors()) //enable CORS

app.use('/getTests', getTests)

app.listen(PORT, () => {
  console.log('API app started')
})
