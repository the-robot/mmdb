import { Row, Col, Spin, Button } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { fetch, reset } from '../../actions/series/airingTodayAction';
import ShowsView from '../../components/Show/ShowsView';

@connect((store) => {
  return {
    series: store.series_airing_today.series,
    page: store.series_airing_today.page,

    fetched_all: store.series_airing_today.fetched_all,
    fetching: store.series_airing_today.fetching,
  };
})
export default class AiringToday extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetch(this.props.page));
  }

  componentDidMount() {
    document.title = "Series - Airing Today";
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  loadMore() {
    this.props.dispatch(fetch(this.props.page));
  }

  render() {
    const series = { intheatres : this.props.series };

    // if fetched all hide load more else show
    const buttonVisibility = (this.props.fetched_all != true ? 'initial' : 'hidden');

    return(
      <div>
        <Row type="flex" justify="start" align="middle">
          <Col
            xs={{ span: 24 }} 
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
          >
            <h4>Airing Today</h4>
          </Col>
        </Row>

        <Row type="flex" justify="center">
          <Col span={24}>
            <ShowsView shows={ series } year={ 'intheatres' } path='calendar/' />
          </Col>

          <Col>
            { this.props.fetching ? (
              <Spin size="large" />
            ) : (
              <Button type="primary" onClick={() => this.loadMore()}
                style={{ visibility: buttonVisibility }}>
                Load More
              </Button>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}