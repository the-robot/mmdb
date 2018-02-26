
import { Col, Card } from 'antd';
import React from 'react';

const { Meta } = Card;

export default class CastCard extends React.Component {
  render() {
    const name = this.props.name;
    const character = this.props.character;
    const picture = this.props.picture;

    return (
      <Col span={4}>
        <Card
          hoverable
          style={{ width: 160 }}
          cover={<img alt="profile picture" src={ picture } style={{ height: 230 }} />}
          >
          <Meta
            title={ name }
            description={ character }
            style={{ fontSize: 12, overflow: 'hidden', height: 90 }}
          />
        </Card>
      </Col>
    );
  }
}