import { Row, Col, Button, Spin } from 'antd';
import React from 'react';

export default class Loading extends React.Component {
  goBack() {
    window.history.back();
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="start" style={{ marginBottom: 20 }}>
          <Button type="primary" icon="left" onClick={this.goBack.bind(this)}>
            Back
          </Button>
        </Row>

        <Row type="flex" justify="center">
          <Spin size="large" />
        </Row>
      </div>
    );
  }
}