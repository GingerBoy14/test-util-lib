const { ICONS, ICONS_KEYS } = require('../config')

function icons() {}
ICONS_KEYS.forEach((key) => {
  icons.prototype[key] = `${ICONS[key]} `
})
module.exports = new icons()
