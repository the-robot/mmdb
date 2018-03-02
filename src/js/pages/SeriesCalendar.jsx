import { Row, Col, Input, Button, BackTop, Spin } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import MoviesView from '../components/Movie/MoviesView';

@connect((store) => {
  return {
    series: store.calendar.series,
    year: store.calendar.year,
    skip: store.calendar.skip,
    fetching: store.calendar.fetching,
  };
})
export default class SeriesCalendar extends React.Component {
  render() {
    const Search = Input.Search;
    const series = this.props.series;

    return (
      <div>
        <Row type="flex" justify="start">
          <Col>
            <h1>TV Series Calendar</h1>
          </Col>
        </Row>

        <Row type="flex" justify="end" >
          <Col>
            <Search
              placeholder="search series"
              style={{ width: 300 }}
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
        </Row>

        {/*

        <MoviesView movies={ movies } />

        <Row type="flex" justify="center">
          <Col>
            { this.props.fetching ? (
              <Spin size="large" />
            ) : (
              <Button type="primary" onClick={this.getNewMovies.bind(this)} >Load More</Button>
            )}
          </Col>
        </Row>

        */}

        {/* Button to go back to top */}
        <BackTop />
      </div>
    );
  }
}