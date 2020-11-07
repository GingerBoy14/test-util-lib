const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

const PORT = process.env.NODE_PORT || 5000
app.use(cors()) //enable CORS

app.use('/getTests', (req, res) => {})

app.listen(5000, () => {
  console.log('API app started')
})
