import { Row, Col, Input, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { fetchMovies } from '../actions/calendarAction';
import MoviesView from '../components/Movie/MoviesView';

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

  getMovieData(year=this.props.year, stop=this.props.skip) {
    for (let i=0; i<stop; i++) {
      let tofetch = year - i;

      // prevent sending request for already fetched data
      if (!this.alreadyFetched(tofetch.toString()))
        this.props.dispatch(fetchMovies(tofetch, 1, 4));
    }
  }

  alreadyFetched(year) {
    for (let i=0; i<this.props.movies.length; i++) {
      if (Object.keys(this.props.movies[i])[0] === year)
        return true;
    }
    return false;
  }

  loadMoreMovies() {
    // get last fetched movie year
    var lastIndex = this.props.movies.length - 1;
    var lastYear;

    try {
      lastYear = Object.keys(this.props.movies[lastIndex])[0];
      lastYear = parseInt(lastYear);
    } catch (err) {
      return;
    }

    this.getMovieData(lastYear-1);
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

        <MoviesView movies={ movies } />

        <Row type="flex" justify="center">
          <Col>
            <Button type="primary" onClick={this.loadMoreMovies.bind(this)} >Load More</Button>
          </Col>
        </Row>
      </div>
    );
  }
}