import { Row, Col, Typography, Button, Empty } from 'antd'

const { Text } = Typography

const FileNotFound = ({ fetchData, imgPath, title }) => (
  <Row justify="center" align="middle" style={{ height: '100%' }}>
    <Col xs={24} sm={20} md={18} lg={10} xl={8} xxl={6} justify="center">
      <Empty
        image={<img src={imgPath} alt="Empty" style={{ width: '100%' }} />}
        description={<Text style={{ fontSize: '1.5rem' }}>{title}</Text>}
        imageStyle={{ height: 'auto' }}>
        <Button type="secondary" onClick={fetchData}>
          Run tests
        </Button>
      </Empty>
    </Col>
  </Row>
)

export default FileNotFound
