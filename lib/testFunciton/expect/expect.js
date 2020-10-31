const compareFunction = require('./compareFunctions')

function expect(received) {
    this.received = received
    this.expects = {}
    Object.setPrototypeOf(compareFunction, this)
    return compareFunction
}

module.exports = expect
