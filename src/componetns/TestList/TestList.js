import React, { useState, useEffect } from 'react'
import { StatusLabel } from '../StatusLabel'
import { Grid, Card, Button, Typography, Collapse } from 'antd'
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons'

const { Title, Text } = Typography
const { useBreakpoint } = Grid
const { Panel } = Collapse

//fixme after page reload list collapsed but it should be open, after click on 'run tests' button it open

const TestList = ({ data }) => {
  const [activePanels, setActivePanels] = useState([])
  return (
    <Card title={<TestTitle collapse={setActivePanels} />} bordered={false}>
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
          console.log(activePanels)
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
        <div key={description}>
          {description}
          {it.map(({ name, expects }) => {
            const Icon = () => {
              return expects.status ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <CloseCircleTwoTone twoToneColor="#E94149" />
              )
            }
            return (
              <div key={name}>
                <Icon /> <Text>{name}</Text>
              </div>
            )
          })}
        </div>
      ))}
    </>
  )
}

export default TestList
