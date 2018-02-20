import { Row, Col, Button, Icon } from 'antd';
import React from 'react';

import MovieCard from './MovieCard';

export default class MoviesView extends React.Component {
  render() {
    const movies = this.props.movies;
    // show footer or not in each row
    const showFooter = this.props.showFooter;

    const moviesRow = movies.map(
      (movie, i) => <MoviesRow key={ i } movies={ movie } showFooter={ showFooter } />
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
    const showFooter = this.props.showFooter;

    // Header Button CSS
    const headerButton = {
      fontSize: 28,
      border: 'None',
      marginBottom: 8,
    }

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
      <div style={{ marginBottom: 32 }} >
        <Row gutter={16} type="flex" justify="start">
          <Col><Button size='large' style={ headerButton } > { year } </Button></Col>
        </Row>

        <Row gutter={24} type="flex" justify="center">
          { movieCards }
        </Row>
      </div>
    );
  }
}