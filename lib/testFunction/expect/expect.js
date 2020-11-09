const compareFunctions = require('./compareFunctions')

function expect(received) {
  this.received = received //need to get received data in compareFunctions
  Object.setPrototypeOf(compareFunctions, this)
  return compareFunctions
}

module.exports = expect
