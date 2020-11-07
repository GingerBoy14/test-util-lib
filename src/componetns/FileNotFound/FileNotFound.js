import { Row, Col, Typography, Image, Space, Button } from 'antd'

import EmptyLog from './empty.svg'
const { Title } = Typography

const FileNotFound = ({ fetchData }) => (
  <Row justify="center" align="middle" style={{ height: '100%' }}>
    <Col xs={24} sm={20} md={18} lg={10} xl={8} xxl={6} justify="center">
      <Space align="center" direction="vertical" size="middle">
        <Image src={EmptyLog} alt="" preview={false} />
        <Title level={4} type="secondary">
          Can't find logs file
        </Title>
      </Space>
      <Space align="center" direction="vertical" style={{ width: '100%' }}>
        <Button type="secondary" onClick={fetchData}>
          Run tests
        </Button>
      </Space>
    </Col>
  </Row>
)

export default FileNotFound
