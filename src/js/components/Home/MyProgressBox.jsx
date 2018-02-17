import { Row, Col, Card, Tag } from 'antd';
import React from 'react';

export default class MyProgressBox extends React.Component {
  render() {
    const title = 'My Progress';

    return(
      <Card title={ title } bordered={false} style={{ width: 300 }}>
        <Row style={{ margin: 5 }}>
          <Col span={18}>Planning</Col>
          <Col><Tag color="#26f256">{ this.props.myProgress.planning }</Tag></Col>
        </Row>

        <Row style={{ margin: 5 }}>
          <Col span={18}>Watching</Col>
          <Col><Tag color="#2db7f5">{ this.props.myProgress.watching }</Tag></Col>
        </Row>

        <Row style={{ margin: 5 }}>
          <Col span={18}>Completed</Col>
          <Col><Tag color="#108ee9">{ this.props.myProgress.completed }</Tag></Col>
        </Row>

        <Row style={{ margin: 5 }}>
          <Col span={18}>Dropped</Col>
          <Col><Tag color="#f70404">{ this.props.myProgress.dropped }</Tag></Col>
        </Row>
      </Card>
    );
  }
}