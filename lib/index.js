const fs = require('fs')
const { parseTests, clearLogFile } = require('./module/workWithFile')
const { TESTS_PATH, LOG_PATH } = require('./constants')
const {
  workWithFile: { writeLogFile, readLogFile }
} = require('./module')
const { showLog } = require('./module/cli')

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
    const logFile = readLogFile()
    const log = logFile.log
    console.log(readLogFile())
    //remove badFile log, and set it to error
    log.splice(log.length - logFile.curTest.total, logFile.curTest.total)
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
    if (!badFile) {
      temp.tests.failed += temp.curTest.failed
      temp.tests.passed += temp.curTest.passed
      temp.tests.total += temp.curTest.total
    }

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
buf.log = buf.log.sort((a, b) =>
  a.status === b.status ? 0 : a.status ? -1 : 1
)

writeLogFile(buf)
showLog(buf)
