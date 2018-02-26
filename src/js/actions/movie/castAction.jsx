// Get movie cast informations

import axios from "axios";

import getTmdbAPIKey from '../../api';

export const getCast = (id) => {
  return (dispatch) => {
    dispatch({type: "FETCH_MOVIE"});

    const domain = 'https://api.themoviedb.org/3/movie/';
    const url = domain + id + '/credits?api_key=' + getTmdbAPIKey();

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_MOVIE_CAST_FULFILLED",
          payload: response.data.cast,
        });
      })
      .catch((err) => {
        dispatch({type: "FETCH_MOVIE_REJECTED", payload: err});
      })
  }
}
