import { Grid, Card, Space, Typography } from 'antd'
import React from 'react'
const { Text, Paragraph, Title } = Typography
const { useBreakpoint } = Grid

const TestSummary = (props) => {
  const { children, tests, testSuites } = props
  const screens = useBreakpoint()

  return (
    <Card
      bordered={false}
      title={
        !screens.xs && (
          <div style={{ display: 'flex' }}>
            <Title level={4}>Info </Title>
          </div>
        )
      }>
      <Paragraph>
        <TestParagraph title="Tests" tests={tests} />
        <TestParagraph title="Test Suites" tests={testSuites} />
      </Paragraph>

      <Space align="start" direction="vertical" style={{ width: '100%' }}>
        {children}
      </Space>
    </Card>
  )
}

const TestParagraph = ({ title, tests }) => (
  <div>
    <Text strong>{title}: </Text>
    {tests.passed > 0 && <Text type="success">{tests.passed} passed, </Text>}
    {tests.failed > 0 && <Text type="danger">{tests.failed} failed, </Text>}
    <Text>{tests.total} total</Text>
  </div>
)
export default TestSummary
