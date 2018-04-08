import { Row, Col, Card, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default class ShowCard extends React.Component {
  render() {
    const { showInfo } = this.props;
    const link = this.props.path + showInfo.id;

    return(
      <Col xs={{ span: 12, offset: 0 }} 
           sm={{ span: 8, offset: 0 }}
           md={{ span: 8, offset: 0 }}
           lg={{ span: 6, offset: 0 }}
           xl={{ span: 4, offset: 0 }}
           style={{ marginBottom: '50px' }}>

        <a href={"#" + link}>
          <Tooltip title={ showInfo.title }>
            <Card
              style={{ width: 140, height: 180 }}
              cover={<img alt="poster" src={ showInfo.poster } />
            }/>
          </Tooltip>
        </a>

      </Col>
    );
  }
}