import { Row, Col, Spin, Button } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { fetch, reset } from '../actions/inTheatresAction';
import ShowsView from '../components/Show/ShowsView';

@connect((store) => {
  return {
    movies: store.intheatres.movies,
    page: store.intheatres.page,

    fetched_all: store.intheatres.fetched_all,
    
    fetching: store.intheatres.fetching,
  };
})
export default class InTheaters extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetch(this.props.page));
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  loadMore() {
    this.props.dispatch(fetch(this.props.page));
  }

  render() {
    const movies = { intheatres : this.props.movies };

    // if fetched all hide load more else show
    const buttonVisibility = (this.props.fetched_all != true ? 'initial' : 'hidden');

    return(
      <div>
        <Row type="flex" justify="start" align="middle">
          <Col span={24}>
            <h1>Movies in theatre</h1>
          </Col>
        </Row>

        <Row type="flex" justify="center">
          <Col span={24}>
            <ShowsView shows={ movies } year={ 'intheatres' } path='movies/' />
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