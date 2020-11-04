const { getFunctionName } = require('../../../helpers')

function toBe(expects) {
  if (this.received !== expects) {
    throw { received: this.received, expects, funcName: getFunctionName() }
  }
}
function toEqual(expects) {
  if (JSON.stringify(this.received) !== JSON.stringify(expects)) {
    throw { received: this.received, expects, funcName: getFunctionName() }
  }
}
function toBeFalsy(expects) {}
function toBeTruthy(expects) {}
function lengthOf(expects) {
  if (this.received.length !== expects) {
    throw { received: this.received, expects, funcName: getFunctionName() }
  }
}
function toBeGreaterThan(expects) {}
function toBeGreaterThanOrEqual(expects) {}
function toBeLessThan(expects) {}
function toBeLessThanOrEqual(expects) {}

module.exports = {
  toBe,
  toEqual,
  toBeFalsy,
  toBeTruthy,
  lengthOf,
  toBeGreaterThan,
  toBeGreaterThanOrEqual,
  toBeLessThan,
  toBeLessThanOrEqual
}
