import { Row, Col, Typography, Button, Empty } from 'antd'

import EmptyLog from './empty.svg'
const { Title } = Typography

const FileNotFound = ({ fetchData }) => (
  <Row justify="center" align="middle" style={{ height: '100%' }}>
    <Col xs={24} sm={20} md={18} lg={10} xl={8} xxl={6} justify="center">
      <Empty
        image={<img src={EmptyLog} alt="Empty" style={{ width: '100%' }} />}
        description={<Title level={4}>Can't find logs file</Title>}
        imageStyle={{ height: 'auto' }}>
        <Button type="secondary" onClick={fetchData}>
          Run tests
        </Button>
      </Empty>
    </Col>
  </Row>
)

export default FileNotFound
