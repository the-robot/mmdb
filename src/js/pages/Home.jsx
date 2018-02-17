import { Row, Col, Card } from 'antd';
import React from 'react';

import MyProgressBox from '../components/Home/MyProgressBox';

export default class Home extends React.Component {
  formatDigit(digit) {
    return digit > 9 ? "" + digit: "0" + digit;
  }

  render() {
    const myProgress = {
      planning: this.formatDigit(19),
      watching: this.formatDigit(2),
      completed: this.formatDigit(45),
      dropped: this.formatDigit(2),
    }

    return (
      <div>
        <Row gutter={16}>
          <h1>MMDB</h1>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <MyProgressBox myProgress={ myProgress } />
          </Col>

          <Col span={8}>
            <Card title="Card title" bordered={false}>Card content</Card>
          </Col>

          <Col span={8}>
            <Card title="Card title" bordered={false}>Card content</Card>
          </Col>
        </Row>
      </div>
    );
  }
}
