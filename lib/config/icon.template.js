const figures = require('figures')

const ICONS = {
  success: figures.main.tick,
  error: figures.main.cross,
  item: figures.main.bullet
}
const ICONS_KEYS = Object.keys(ICONS)
const ICONS_VALUES = Object.values(ICONS)

module.exports = { ICONS, ICONS_KEYS, ICONS_VALUES }
