const fs = require('fs')
const { parseTests, clearLogFile } = require('./module/workWithFile')
const { TESTS_PATH, LOG_PATH } = require('./constants')
const {
  workWithFile: { writeLogFile, readLogFile }
} = require('./module')

clearLogFile(LOG_PATH)
writeLogFile({
  log: [],
  tests: {
    passed: 0,
    failed: 0,
    total: 0
  },
  testSuites: {
    passed: 0,
    failed: 0,
    total: 0
  }
})

parseTests(TESTS_PATH).forEach((path) => {
  let temp = readLogFile()
  let badFile = false //need to correct count failed testSuites
  temp.path = path
  temp.curTest = {
    passed: 0,
    failed: 0,
    total: 0
  }
  writeLogFile({ ...temp }) //write path of current file for using it in log
  try {
    eval(
      `const { describe, it, expect } = require('./testFunction')\n 
      ${fs.readFileSync(path).toString()}`
    )
  } catch (e) {
    const log = readLogFile().log

    //remove badFile log, and set it to error
    log.splice(log.length - 1, 1)
    log.push({
      error: e.name,
      status: false,
      path
    })

    //write modified log to file
    writeLogFile({
      ...readLogFile(),
      log
    })
    badFile = true
  } finally {
    temp = readLogFile()
    if (temp.curTest.failed > 0 || badFile) {
      temp.testSuites.failed++
      temp.tests.failed += temp.curTest.failed
    } else {
      const idx = temp.curTest.passed //need to know how math tests were in this file to clear it

      temp.testSuites.passed++
      temp.tests.passed += temp.curTest.passed
      if (idx) {
        const log = readLogFile().log

        //remove unnecessary log data(because it passed it without errors), and set it to "pass" status
        log.splice(log.length - idx, idx)
        log.push({ path, status: true })

        //write modified log to file
        writeLogFile({
          ...readLogFile(),
          log
        })
      }
    }
    temp.tests.total += temp.curTest.total
    temp.testSuites.total++
    writeLogFile({
      ...readLogFile(),
      testSuites: temp.testSuites,
      tests: temp.tests
    })
  }
})

//delete unnecessary field in log file
const buf = readLogFile()
delete buf.path
delete buf.curTest
writeLogFile(buf)

console.log(buf)
