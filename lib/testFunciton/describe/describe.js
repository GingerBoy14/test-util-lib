

function describe(description, callback) {
    this.tests = {
        passed: 0,
        failed: 0,
        total: 0
    }
    callback.bind(this)
    callback()
}

module.exports = describe
