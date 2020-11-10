import React, { useState } from 'react'
import { Button, Col, Row } from 'antd'
import { FileNotFound } from '../FileNotFound'
import { TestList } from '../TestList'
import { TestSummary } from '../TestsSummary'
import EmptyLog from '../FileNotFound/empty.svg'
import ErrorLog from '../FileNotFound/fixing_bugs.svg'

import 'antd/dist/antd.css'

let logFile
try {
  logFile = require('../../log.json')
} catch (e) {
  logFile = 'lostFile'
}

function App() {
  const [log, setLog] = useState(logFile)

  const fetchData = () => {
    fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_FETCH_PORT}/getTestsTree`
    )
      .then((json) => json.json())
      .then((data) => setLog(data))
      .catch(() => setLog('error'))
  }
  if (log === 'lostFile')
    return (
      <FileNotFound
        fetchData={fetchData}
        imgPath={EmptyLog}
        title="Can't find logs file"
      />
    )
  if (log === 'error')
    return (
      <FileNotFound
        fetchData={fetchData}
        imgPath={ErrorLog}
        title="You have some error in code"
      />
    )
  return (
    <Row justify="center" style={{ height: '100%' }}>
      <Col xs={24} sm={24} md={13} flex="5 1 auto" justify="center">
        <TestList data={log.log} />
      </Col>
      <Col xs={24} sm={24} md={10} lg={8} flex="2 1 auto">
        <TestSummary tests={log.tests} testSuites={log.testSuites}>
          <Button type="primary" size="small" onClick={fetchData}>
            Run tests
          </Button>
        </TestSummary>
      </Col>
    </Row>
  )
}

export default App
