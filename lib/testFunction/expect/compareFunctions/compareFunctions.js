const {
  COMPARE_FUNCTIONS,
  COMPARE_FUNCTIONS_KEYS
} = require('../../../constants')

const compareFunctions = {}
COMPARE_FUNCTIONS_KEYS.forEach((key) => {
  compareFunctions[key] = function (expects) {
    if (COMPARE_FUNCTIONS[key](this.received, expects)) {
      throw { received: this.received, expects, funcName: key }
    }
  }
})

module.exports = compareFunctions
