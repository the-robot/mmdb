import { connect } from 'react-redux';
import React from 'react';

import { fetchMovies, resetMoviesData } from '../actions/movieAction';
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
    this.getMovieData();
  }

  componentWillUnmount() {
    resetMoviesData();
  }

  getMovieData(year=this.props.match.params.year) {
    // get the number of page to be fetched
    const page = this.props.page;
    const tofetch = this.props.tofetch;

    for (let i=0; i<tofetch; i++)
      this.props.dispatch(fetchMovies(year, page+i));
  }

  render() {
    const year = this.props.match.params.year;

    // MoviesView only accept array of json objects
    var movies = [{}];
    movies[0][year + ''] = this.props.movies;

    return (
      <div>
        <h3> { movies[0][year + ''].length } </h3>
        <MoviesView movies={ movies } />
      </div>
    );
  }
}
