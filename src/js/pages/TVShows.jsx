import { connect } from 'react-redux';
import { Row, Col, Button, BackTop, Spin } from 'antd';
import React from 'react';

import { fetchSeries as fetch, reset } from '../actions/showsAction';
import ShowsView from '../components/Show/ShowsView';

@connect((store) => {
  return {
    shows: store.shows.shows,
    page: store.shows.page,
    tofetch: store.shows.tofetch,
    fetching: store.shows.fetching,
  };
})
export default class TVShows extends React.Component {
  componentWillMount() {
    this.getShows();
  }

  componentDidMount() {
    document.title = "Calendar - TV Shows (" + this.props.match.params.year + ")";
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  getShows(year=this.props.match.params.year) {
    // get the number of page to be fetched
    const page = this.props.page;
    const tofetch = this.props.tofetch;

    for (let i=0; i<tofetch; i++)
      this.props.dispatch(fetch(year, page+i));
  }

  getNewShows() {
    this.getShows();
  }

  render() {
    const year = this.props.match.params.year;

    // SeriesView only accept array of json objects
    var series = [{}];
    series[0][year + ''] = this.props.shows;

    return (
      <div>
        <ShowsView shows={ series } path='series/' />

        <Row type="flex" justify="center">
          <Col>
            { this.props.fetching ? (
              <Spin size="large" />
            ) : (
              <Button type="primary" onClick={this.getNewShows.bind(this)}>Load More</Button>
            )}
          </Col>
        </Row>

        {/* Button to go back to top */}
        <BackTop />
      </div>
    );
  }
}
