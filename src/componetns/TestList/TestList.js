import React, { useState, useEffect } from 'react'
import { StatusLabel } from '../StatusLabel'
import { Grid, Card, Button, Typography, Collapse } from 'antd'
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons'

const { Title, Text } = Typography
const { useBreakpoint } = Grid
const { Panel } = Collapse

const TestList = ({ data }) => {
  const [activePanels, setActivePanels] = useState([])
  const screen = useBreakpoint()
  return (
    <Card
      title={<TestTitle collapse={setActivePanels} />}
      bordered={false}
      bodyStyle={{ padding: `${screen.xs && '12px 0'}` }}>
      <Collapse
        bordered={false}
        defaultActiveKey={activePanels}
        activeKey={activePanels}
        onChange={(key) => setActivePanels(key)}
        ghost>
        {data.map((log, key) => {
          const { path, status, describe } = log
          if (status) {
            return (
              <div key={key}>
                <StatusLabel path={path} status={status} />
              </div>
            )
          }
          return (
            <Panel
              key={key}
              forceRender
              header={<StatusLabel path={path} status={status} />}>
              <Describe
                describe={describe}
                setActivePanels={setActivePanels}
                activePanels={activePanels}
                currentPanel={key}
              />
            </Panel>
          )
        })}
      </Collapse>
    </Card>
  )
}

const TestTitle = ({ collapse }) => {
  const screens = useBreakpoint()
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Title level={4}>Tests Log</Title>
      {screens.xs && (
        <Button size="small" onClick={() => collapse([])}>
          Collapse Log
        </Button>
      )}
    </div>
  )
}

const Describe = (props) => {
  const { describe, setActivePanels, activePanels, currentPanel } = props
  useEffect(() => {
    activePanels.push(currentPanel)
    setActivePanels(activePanels)
  }, [])
  return (
    <>
      {describe.map(({ description, it }) => (
        <div key={description} style={{ paddingBottom: '12px' }}>
          <Text strong>{description}</Text>
          {it.map(({ name, expects }) => {
            const Icon = () => {
              return expects.status ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <CloseCircleTwoTone twoToneColor="#E94149" />
              )
            }
            return (
              <div key={name} style={{ padding: '0 24px' }}>
                <Icon /> <Text>{name}</Text>
                {expects.error && (
                  <Text type="secondary" style={{ paddingLeft: '24px' }}>
                    expects({JSON.stringify(expects.error.received)}).
                    {expects.error.funcName}(
                    {JSON.stringify(expects.error.expects)})
                  </Text>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </>
  )
}

export default TestList
