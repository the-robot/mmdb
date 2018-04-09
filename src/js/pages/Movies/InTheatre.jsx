import { Row, Col, Spin, Button } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { fetch, reset } from '../../actions/movies/inTheatreAction';
import ShowsView from '../../components/Show/ShowsView';

@connect((store) => {
  return {
    movies: store.movies_in_theatre.movies,
    page: store.movies_in_theatre.page,

    fetched_all: store.movies_in_theatre.fetched_all,
    
    fetching: store.movies_in_theatre.fetching,
  };
})
export default class InTheater extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetch(this.props.page));
  }

  componentDidMount() {
    document.title = "Movies - In Theatre";
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
          <Col
            xs={{ span: 24 }} 
            sm={{ span: 14 }}
            md={{ span: 10 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            <h4>Movies In Theatre</h4>
          </Col>
        </Row>

        <Row type="flex" justify="center">
          <Col span={24}>
            <ShowsView shows={ movies } year={ 'intheatres' } path='calendar/' />
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