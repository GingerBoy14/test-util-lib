const {
  workWithFile: { writeLogFile, readLogFile }
} = require('../../module')
function it(comment, callback) {
  this.expects = { status: true }
  this.log.it = comment
  const buf = readLogFile()
  this.tests = buf.curTest
  try {
    callback()
    this.tests.passed++
  } catch (error) {
    this.expects.status = false
    this.expects.error = error
    //`expect(${text(received).red()} ${text(
    //       `[${typeof received}]`
    //     ).cyan()}).${funcName}(${text(expects).green()})`
    this.tests.failed++
  } finally {
    this.tests.total++
  }
  this.log.expects = this.expects
  this.log.path = buf.path
  writeLogFile({
    ...buf,
    log: [...buf.log, this.log],
    path: buf.path,
    curTest: this.tests
  })
}

module.exports = it
