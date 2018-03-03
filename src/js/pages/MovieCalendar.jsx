import { Row, Col, Input, Button, BackTop, Spin } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { fetchMovies as fetch, reset } from '../actions/calendarAction';
import ShowsView from '../components/Show/ShowsView';

@connect((store) => {
  return {
    movies: store.calendar.movies,
    year: store.calendar.year,
    skip: store.calendar.skip,
    fetching: store.calendar.fetching,
  };
})
export default class MovieCalendar extends React.Component {
  componentWillMount() {
    this.getMovies();
  }

  // componentWillUnmount() {
  //   this.props.dispatch(reset());
  // }

  getMovies(year=this.props.year, stop=this.props.skip) {
    for (let i=0; i<stop; i++) {
      let tofetch = year - i;

      // prevent sending request for already fetched data
      if (!this.isFetched(tofetch.toString()))
        this.props.dispatch(fetch(tofetch, 1, 4));
    }
  }

  isFetched(year) {
    for (let i=0; i<this.props.movies.length; i++) {
      if (Object.keys(this.props.movies[i])[0] === year)
        return true;
    }
    return false;
  }

  getNewMovies() {
    // get last fetched movie year
    var lastIndex = this.props.movies.length - 1;
    var lastYear;

    try {
      lastYear = Object.keys(this.props.movies[lastIndex])[0];
      lastYear = parseInt(lastYear);
    } catch (err) {
      return;
    }

    this.getMovies(lastYear-1);
  }

  render() {
    const Search = Input.Search;
    const movies = this.props.movies;

    return (
      <div>
        <Row type="flex" justify="start">
          <Col>
            <h1>Movie Calendar</h1>
          </Col>
        </Row>

        <Row type="flex" justify="end" >
          <Col>
            <Search
              placeholder="search movie"
              style={{ width: 300 }}
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
        </Row>

        <ShowsView shows={ movies } path='movies/' />

        <Row type="flex" justify="center">
          <Col>
            { this.props.fetching ? (
              <Spin size="large" />
            ) : (
              <Button type="primary" onClick={this.getNewMovies.bind(this)} >Load More</Button>
            )}
          </Col>
        </Row>

        {/* Button to go back to top */}
        <BackTop />
      </div>
    );
  }
}