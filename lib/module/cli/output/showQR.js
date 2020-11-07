const qrcode = require('qrcode-terminal')
const { text } = require('../../../helpers')

const showQR = () => {
  require('dns').lookup(require('os').hostname(), (err, add) => {
    console.log(text('\n\nScan QR-code to display tests results.').bold())
    qrcode.generate(`http://${add}:3000/`, { small: true })
  })
}

module.exports = showQR
