const chalk = require('chalk')

const { TEXT, TEXT_KEYS } = require('../config')

function text(string) {
  this.string = string
  TEXT_KEYS.forEach((key) => {
    this[key] = () => {
      return chalk`{${TEXT[key]} ${this.string}}`
    }
  })
  return this
}

module.exports = text
