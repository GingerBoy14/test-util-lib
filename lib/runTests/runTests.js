const fs = require('fs')
const { TESTS_PATH, LOG_PATH } = require('../constants')
const {
  writeLogFile,
  readLogFile,
  parseTests,
  clearLogFile
} = require('../module/workWithFile')

const runTests = () => {
  clearLogFile(LOG_PATH)
  //write main log file layout
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
        `const { describe, it, expect } = require('../testFunction')\n 
      ${fs.readFileSync(path).toString()}`
      )
    } catch (e) {
      const temp = readLogFile()
      const log = temp.log
      //remove badFile log, and write only one obj with path and error
      log.splice(log.length - temp.curTest.total, temp.curTest.total)
      log.push({
        error: { name: e.name, message: e.message },
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
      } else {
        const idx = temp.curTest.passed //need to know how math tests were in this file to clear it

        temp.testSuites.passed++
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
      //if in file error but it run tests and has results, don't write it
      if (!badFile) {
        temp.tests.failed += temp.curTest.failed
        temp.tests.passed += temp.curTest.passed
        temp.tests.total += temp.curTest.total
      }

      temp.testSuites.total++ //increase total file count

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

  //push passed file tot top of the list
  buf.log = buf.log.sort((a, b) =>
    a.status === b.status ? 0 : a.status ? -1 : 1
  )

  writeLogFile(buf) //write final clear logs
}

module.exports = runTests
