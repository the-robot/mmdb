import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import React from 'react';

import { fetch, reset } from '../actions/movieAction';
import MoviesView from '../components/Movie/MoviesView';

@connect((store) => {
  return {
    movies: store.movies.movies,
    page: store.movies.page,
    tofetch: store.movies.tofetch,
  };
})
export default class Movies extends React.Component {
  componentWillMount() {
    this.getMovies();
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  getMovies(year=this.props.match.params.year) {
    // get the number of page to be fetched
    console.log('YEAR: ', year);

    const page = this.props.page;
    const tofetch = this.props.tofetch;

    for (let i=0; i<tofetch; i++)
      this.props.dispatch(fetch(year, page+i));
  }

  getNewMovies() {
    this.getMovies();
  }

  render() {
    const year = this.props.match.params.year;

    // MoviesView only accept array of json objects
    var movies = [{}];
    movies[0][year + ''] = this.props.movies;

    return (
      <div>
        <MoviesView movies={ movies } />

        <Row type="flex" justify="center">
          <Col>
            <Button type="primary" onClick={this.getNewMovies.bind(this)} >Load More</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
