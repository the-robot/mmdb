import { Row, Col, Button, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import React from 'react';

import MovieCard from './MovieCard';

export default class MoviesView extends React.Component {
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

    // Header Button CSS
    const headerButton = {
      fontSize: 28,
      border: 'None',
      marginBottom: 8,
    }

    var year = null;
    var moviesLink = null;
    var movieCards = '';
    
    // make movie card on each movie objects from json
    var success = true;
    try {
      year = Object.keys(movies);
    } catch (err) {
      success = false;
    }

    if (success) {
      moviesLink = '/calendar/' + year;
      
      movieCards = movies[year].map(
        (movie, i) => <MovieCard key={ i } movieInfo={ movie } />
      );
    }

    return(
      <div>
        <Row gutter={16} type="flex" justify="start">
          <Col>
            <NavLink to={ moviesLink } >
              <Button size='large' style={ headerButton }> { year } </Button>
            </NavLink>
          </Col>
        </Row>

        <Row gutter={24} type="flex" justify="center">
          { movieCards }
        </Row>
      </div>
    );
  }
}