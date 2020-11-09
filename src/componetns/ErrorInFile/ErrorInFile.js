import React from 'react'
import { Space, Typography } from 'antd'
const { Text } = Typography

const ErrorInLine = ({ path, error }) => (
  <Space>
    <Text strong ellipsis>
      You have some {error.name}: {error.message} in {path}
    </Text>
  </Space>
)
export default ErrorInLine
