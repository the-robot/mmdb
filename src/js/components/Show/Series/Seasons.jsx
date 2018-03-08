// Show TV Series Seasons in Row
import { Row, Col, List, Card } from 'antd';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default class Seasons extends React.Component {
  render() {
    const seasons = this.props.seasons;
    const pathname = this.props.pathname;

    return (
      <Row type="flex" justify="start">
        <Col span={24} style={{ marginLeft: 20 }}>
          <h4> Seasons </h4>
        </Col>

        <Col span={24}>
          <List
            grid={{ gutter:12, column: 6 }}
            dataSource={ seasons }
            renderItem={season => (
              <List.Item>
                <NavLink to={
                  pathname + '/' + season.season_number
                }>
                  <Card bordered={false} hoverable>
                    <img src={ season.poster } style={{ width: 120, paddingBottom: 10 }} />
                    <h6> { season.title } </h6>
                    <p> { season.air_date } </p>
                  </Card>
                </NavLink>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  }
}