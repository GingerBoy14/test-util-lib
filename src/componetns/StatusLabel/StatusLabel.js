import React from 'react'
import { Typography, Space } from 'antd'
import './Label.css'
const { Text } = Typography
const StatusLabel = ({ status = false, path }) => {
  return (
    <Space>
      <Text className={`${status ? 'pass' : 'fail'}-label`} strong>
        {status ? 'PASS' : 'FAIL'}
      </Text>
      <Text strong ellipsis>
        {path}
      </Text>
    </Space>
  )
}

export default StatusLabel
