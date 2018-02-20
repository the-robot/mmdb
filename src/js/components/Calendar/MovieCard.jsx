import { Row, Col, Card, Tag } from 'antd';
import React from 'react';

export default class MovieCard extends React.Component {
  ratingScale(rating) {
    if (rating === 0) {
      return {
        value: 'none',
        color: '#f50',
      }
    }

    if (rating < 3) {
      return {
        value: rating + '/10',
        color: '#f70404',
      }
    }

    else if (rating > 3 && rating < 6) {
      return {
        value: rating + '/10',
        color: '#26f256',
      }
    }

    else {
      return {
        value: rating + '/10',
        color: '#108ee9',
      }
    }
  }

  render() {
    const { movieInfo } = this.props;
    const rating = this.ratingScale(movieInfo.rating);

    return(
      <Col span={6}>
        <Card title={ movieInfo.title } extra={<a href="#">More</a>} style={{ width: 260, textAlign: 'justify' }}
        cover={<img alt="poster" src={ movieInfo.poster } />}>
          <p style={{overflow: 'hidden', height: '210px' }}>{ movieInfo.summary }</p>
          <Tag color={ rating.color }>Rating: { rating.value }</Tag>
        </Card>   
      </Col>
    );
  }
}