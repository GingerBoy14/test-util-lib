const { writeLogFile, readLogFile } = require('../../module/workWithFile')

function it(comment, callback) {
  this.expects = { status: true } //by default test passed
  this.log.it = comment
  const temp = readLogFile()
  this.tests = temp.curTest

  //run function -> error handling / tests counting
  try {
    callback()
    this.tests.passed++
  } catch (errorData) {
    this.expects.status = false
    this.expects.error = errorData //example: { received: { a: 5 }, expects: { a: 5 }, funcName: 'toBe' }
    this.tests.failed++
  } finally {
    this.tests.total++
  }
  this.log.expects = this.expects //if test passed equal to default, else equal to data from catch
  this.log.path = temp.path

  writeLogFile({
    ...temp,
    log: [...temp.log, this.log],
    path: temp.path,
    curTest: this.tests
  })
}

module.exports = it
