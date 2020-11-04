const fs = require('fs')
const { LOG_PATH } = require('../../constants')

function writeLogFile(logs) {
  // convert JSON object to string
  const data = JSON.stringify(logs)
  // write JSON string to a file
  fs.writeFileSync(LOG_PATH, data, (err) => {
    if (err) {
      throw err
    }
    console.log('JSON data is saved.')
  })
}
module.exports = writeLogFile
