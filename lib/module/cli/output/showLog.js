const { text, icon } = require('../../../helpers')

const showLog = ({ log, tests, testSuites }) => {
  let curDesc, curFile, showFile, showDesc
  log.forEach((data) => {
    if (data.status) {
      curFile = data.path
      console.log(`${text(' PASS ').pass()} ${data.path}`)
    } else if (!data.status) {
      if (data.description) {
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
          `\texpect(${text(
            JSON.stringify(expects.error.received)
          ).red()} ${text(`[${typeof expects.error.received}]`).cyan()}).${
            expects.error.funcName
          }(${text(
            expects.error.expects ? JSON.stringify(expects.error.expects) : ''
          ).green()})`

        if (expects.status) {
          console.log(`     ${icon.success}${data.it}`)
        } else {
          console.log(`     ${icon.error}${data.it}${errorInExpect()}`)
        }
      } else {
        console.log(
          `\nYou have some ${text(
            `${data.error.name}: ${data.error.message}`
          ).red()} in ${text(data.path).bold()}`
        )
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
