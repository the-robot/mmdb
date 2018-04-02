// Show TV Series Seasons in Row
import { Row, Col, List, Card } from 'antd';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default class Seasons extends React.Component {
  clean(seasons) {
    // remove season with empty data
    for (let i=0; i<seasons.length; i++) {
      if (Object.keys(seasons[i]).length === 0 && seasons[i].constructor === Object)
        seasons.splice(i, 1);
    }

    return seasons;
  }

  render() {
    const seasons = this.clean(this.props.seasons);
    const pathname = this.props.pathname;

    // return nothing if length of seasons after
    // cleaning empty data is 0
    if (seasons.length === 0) {
      return (null);
    }

    return (
      <Row type="flex" justify="start">
        <Col span={24} style={{ marginLeft: 20 }}>
          <h4> Seasons </h4>
        </Col>

        <Col span={24}>
          <List
            grid={{ gutter:12, xs: 2, sm: 3, md: 4, lg: 6, xl: 6, xxl: 8 }}
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