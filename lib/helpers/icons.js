const { ICONS, ICONS_KEYS } = require('../config')

function icons() {}
ICONS_KEYS.forEach((key) => {
    icons[key] = ICONS[key]
})
module.exports = icons
