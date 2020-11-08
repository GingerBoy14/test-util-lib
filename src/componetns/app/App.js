import React, { useState } from 'react'
import { Button, Col, Row } from 'antd'
import { FileNotFound } from '../FileNotFound'
import { TestList } from '../TestList'
import { TestSummary } from '../TestsSummary'
import 'antd/dist/antd.css'
let logFile
try {
  logFile = require('../../log.json')
} catch (e) {
  logFile = false
}

function App() {
  const [log, setLog] = useState(logFile)

  const fetchData = () => {
    fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_FETCH_PORT}/getTests`
    )
      .then((json) => json.json())
      .then((data) => setLog(data))
      .catch(() => setLog(false))
  }
  if (!log) return <FileNotFound fetchData={fetchData} />
  return (
    <Row justify="center" style={{ height: '100%' }}>
      <Col xs={22} sm={20} md={13} flex="5 1 auto" justify="center">
        <TestList data={log.log} />
      </Col>
      <Col xs={22} sm={20} md={10} lg={8} flex="2 1 auto">
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
