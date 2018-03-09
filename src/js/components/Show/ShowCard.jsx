import { Row, Col, Card, Tag } from 'antd';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default class ShowCard extends React.Component {
  ratingScale(rating) {
    if (rating === 0) {
      return {
        value: 'none',
        color: '#000000',  // black
      }
    }

    if (rating < 3) {
      return {
        value: rating + '/10',
        color: '#ff5400',  // orange
      }
    }

    else if (rating >= 3 && rating < 6) {
      return {
        value: rating + '/10',
        color: '#0ecc34',  // green
      }
    }

    else if (rating >= 6 && rating < 8) {
      return {
        value: rating + '/10',
        color: '#1f50f2',  // blue
      }
    }

    else {
      return {
        value: rating + '/10',
        color: '#e20f0f',  // red
      }
    }
  }

  render() {
    const { showInfo } = this.props;
    const rating = this.ratingScale(showInfo.rating);

    const link = '/calendar/' + this.props.path + showInfo.id;

    return(
      <Col xs={{ span: 24, offset: 0}} 
           sm={{ span: 12, offset: 0}}
           md={{ span: 12, offset: 0}}
           lg={{ span: 8, offset: 0}}
           xl={{ span: 6, offset: 0}}
           style={{ marginBottom: '32px' }}>

        <Card title={ showInfo.title }
              extra={ <a href="#"><NavLink to={ link } >More Info</NavLink></a> }
              style={{ width: 260, textAlign: 'justify' }}
              cover={<img alt="poster" height={ 360 } src={ showInfo.poster } />
        }>
          <p style={{overflow: 'hidden', height: '210px' }}>{ showInfo.summary }</p>
          <Tag color={ rating.color }>Rating: { rating.value }</Tag>
        </Card>

      </Col>
    );
  }
}