import React from 'react'
import { StatusLabel } from '../StatusLabel'
import { Grid, Card, Button, Typography } from 'antd'
const { Title } = Typography
const { useBreakpoint } = Grid
const TestList = ({ data }) => {
  return (
    <Card title={<TestTitle />} bordered={false}>
      {data.map((log) => {
        const { path, status } = log
        return (
          <div>
            <StatusLabel path={path} status={status} />
          </div>
        )
      })}
    </Card>
  )
}

const TestTitle = ({ collapse }) => {
  const screens = useBreakpoint()
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Title level={4}>Tests Log</Title>
      {screens.xs && (
        <Button size="small" onClick={collapse}>
          Collapse Log
        </Button>
      )}
    </div>
  )
}
export default TestList
