import React, { useState } from 'react'
import { FileNotFound } from '../FileNotFound'
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
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_FETCH_PORT}`
    )
      .then((data) => setLog(data))
      .catch(() => setLog(false))
  }
  console.log(process.env.REACT_APP_FETCH_PORT)
  return <>{log ? <div>good</div> : <FileNotFound fetchData={fetchData} />}</>
}
export default App
