import { Row, Col, Input, Card } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { fetchMovies } from '../actions/calendarAction';
import MoviesView from '../components/Calendar/MoviesView';

@connect((store) => {
  return {
    movies: store.calendar.movies,
    year: store.calendar.year,
    skip: store.calendar.skip,
  };
})
export default class Calendar extends React.Component {
  componentWillMount() {
    this.getMovieData();
  }

  getMovieData() {
    const year = this.props.year;
    const stop = this.props.skip;

    for(let i=0; i<stop; i++) {
      this.props.dispatch(fetchMovies(year - i, 1, 4));
    }
  }

  render() {
    const Search = Input.Search;
    const movies = this.props.movies;

    return (
      <div>
        <Row gutter={16}>
          <Col>
            <h1>Movie Calendar</h1>
          </Col>
        </Row>

        <Row gutter={16} style={{ textAlign: 'right' }}>
          <Col>
            <Search
              placeholder="search movie"
              style={{ width: 300 }}
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
        </Row>

        <MoviesView movies={ movies } />
      </div>
    );
  }
}