import { Col, Card, Tag } from 'antd';
import React from 'react';

export default class MovieCard extends React.Component {
  render() {
    return(
      <Col span={6}>
        <Card title={ this.props.movieInfo.title } extra={<a href="#">More</a>} style={{ width: 260, textAlign: 'justify' }}
        cover={<img alt="poster" src={ this.props.movieInfo.poster } />}>
          <p>{ this.props.movieInfo.summary }</p>
          <Tag color="#108ee9">{ this.props.movieInfo.rating }</Tag>
        </Card>   
      </Col>
    );
  }
}