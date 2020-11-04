const fs = require('fs')
const { LOG_PATH } = require('../../constants')

const readLogFile = () => JSON.parse(fs.readFileSync(LOG_PATH, 'utf-8'))

module.exports = readLogFile
