const chalk = require('chalk')

const { TEXT, TEXT_KEYS } = require('../config')

function text(string) {
    this.string = string
    TEXT_KEYS.forEach((key) => {
        this[key] = () => {
            this.string = chalk`{${TEXT[key]} ${this.string}}`
            return this
        }
    })
    return this
}

module.exports = text
