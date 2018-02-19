import { Row, Col } from 'antd';
import React from 'react';

import MovieCard from './MovieCard';

export default class CalenderMoviesView extends React.Component {
  render() {
    const movies = this.props.movies;

    const moviesRow = movies.map(
      (movie, i) => <MoviesRow key={ i } movies={ movie } />
    );

    return(
      <div>
        { moviesRow }
      </div>
    );
  }
}

// Group feature movies by year
class MoviesRow extends React.Component {
  render() {
    const movies = this.props.movies;
    var year = null;
    var movieCards = '';
    
    // make movie card on each movie objects from json
    var success = true;
    try {
      year = Object.keys(movies);
    } catch (err) {
      success = false;
    }

    if (success) {
      movieCards = movies[year].map(
        (movie, i) => <MovieCard key={ i } movieInfo={ movie } />
      );
    }

    return(
      <Row gutter={16} >
        <Row>
          <Col><h3> { year } </h3></Col>
        </Row>

        <Row gutter={16} style={{ textAlign: 'center' }} type="flex" justify="space-around">
          { movieCards }
        </Row>
      </Row>
    );
  }
}