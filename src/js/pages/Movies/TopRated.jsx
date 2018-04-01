import { Row, Col, Spin, Button } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { fetch, reset } from '../../actions/movies/topRatedAction';
import ShowsView from '../../components/Show/ShowsView';

@connect((store) => {
  return {
    movies: store.movies_toprated.movies,
    page: store.movies_toprated.page,

    fetched_all: store.movies_toprated.fetched_all,
    
    fetching: store.movies_toprated.fetching,
  };
})
export default class TopRated extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetch(this.props.page));
  }

  componentDidMount() {
    document.title = "Movies - Top Rated";
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  loadMore() {
    this.props.dispatch(fetch(this.props.page));
  }

  render() {
    const movies = { toprated : this.props.movies };

    // if fetched all hide load more else show
    const buttonVisibility = (this.props.fetched_all != true ? 'initial' : 'hidden');

    return(
      <div>
        <Row type="flex" justify="start" align="middle">
        <Col
            xs={{ span: 24 }} 
            sm={{ span: 14 }}
            md={{ span: 10 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            <h4>Top Rated Movies</h4>
          </Col>
        </Row>

        <Row type="flex" justify="center">
          <Col span={24}>
            <ShowsView shows={ movies } year={ 'toprated' } path='calendar/' />
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