const { text, icon } = require('../../../helpers')

const showLog = ({ log, tests, testSuites }) => {
  console.log(log)
  let curDesc
  let curFile
  let showFile
  let showDesc
  log.forEach((data) => {
    if (data.status) {
      curFile = data.path
      console.log(`${text(' PASS ').pass()} ${data.path}`)
    } else {
      showFile = data.path === curFile
      showDesc = data.description === curDesc
      if (!showFile) {
        curFile = data.path
      }
      if (!showDesc) {
        curDesc = data.description
      }

      !showFile && console.log(`\n${text(' FAIL ').fail()} ${curFile}`)
      !showDesc && console.log(` ${curDesc}`)
      const { expects } = data

      const errorInExpect = () =>
        `\texpect(${text(expects.error.received).red()} ${text(
          `[${typeof expects.error.received}]`
        ).cyan()}).${expects.error.funcName}(${text(
          expects.error.expects
        ).green()})`

      if (expects.status) {
        console.log(`     ${icon.success}${data.it}`)
      } else {
        console.log(`     ${icon.error}${data.it}${errorInExpect()}`)
      }
    }
  })
  showTestInfoBlock({ tests, testSuites })
}

const showTestInfoBlock = ({ tests, testSuites }) => {
  const layout = (field, prop, color = 'white') =>
    field[prop] > 0 ? `${text(`${field[prop]} ${prop}`)[color]()}, ` : ''

  console.log(
    `\nTests Suites: ${layout(testSuites, 'passed', 'green')}${layout(
      testSuites,
      'failed',
      'red'
    )}${layout(testSuites, 'total', 'bold')} `
  )

  console.log(
    `Tests: ${layout(tests, 'passed', 'green')}${layout(
      tests,
      'failed',
      'red'
    )}${layout(tests, 'total', 'bold')} `
  )
}
module.exports = showLog
