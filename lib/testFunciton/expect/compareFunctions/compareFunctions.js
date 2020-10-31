const chalk = require('chalk')
const { getFunctionName } = require('../../../helpers')

function toBe(expected) {
    const fuc = (funcName) => funcName
    this.err = chalk.bold(`expect(num).${fuc(getFunctionName())}(5)`)

    console.log(this.err)
}
function toEqual(expects) {

}
function toBeFalsy(expects) {

}
function toBeTruthy(expects) {

}
function toBeGreaterThan(expects) {

}
function toBeGreaterThanOrEqual(expects) {

}
function toBeLessThan(expects) {

}
function toBeLessThanOrEqual(expects) {

}


module.exports = {
    toBe,
    toEqual,
    toBeFalsy,
    toBeTruthy,
    toBeGreaterThan,
    toBeGreaterThanOrEqual,
    toBeLessThan,
    toBeLessThanOrEqual
}
