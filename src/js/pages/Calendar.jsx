import { Row, Col, Input, Card } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { fetchMovies } from '../actions/calendarAction';
import MovieCard from '../components/Calendar/MovieCard';

@connect((store) => {
  return {
    movies: store.movies.movies,
  };
})
export default class Calendar extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchMovies(2016));
  }

  render() {
    const Search = Input.Search;

    const { movies } = this.props;
    const movieCards = movies.results.map(
      (movie, i) => <MovieCard key={ i } movieInfo={ movie } />
    );

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

        <Row gutter={16} >
          <Row>
            <Col><h3>2017</h3></Col>
          </Row>

          <Row gutter={16} style={{ textAlign: 'center' }} type="flex" justify="space-around">
            { movieCards }
          </Row>
        </Row>
      </div>
    );
  }
}
