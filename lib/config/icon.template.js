const figures = require('figures')
const chalk = require('chalk')
const ICONS = {
  success: chalk.green(figures.windows.tick),
  error: chalk.red(figures.windows.cross),
  item: chalk.red(figures.main.bullet)
}
const ICONS_KEYS = Object.keys(ICONS)
const ICONS_VALUES = Object.values(ICONS)

module.exports = { ICONS, ICONS_KEYS, ICONS_VALUES }
