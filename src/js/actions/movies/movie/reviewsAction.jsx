// Get movie cast informations

import axios from "axios";

import getTmdbAPIKey from '../../../api';

export const getReviews = (id, page) => {
  return (dispatch) => {
    const domain = 'https://api.themoviedb.org/3/movie/';
    const url = domain + id + '/reviews?api_key=' + getTmdbAPIKey() + "&page=" + page;
    
    axios.get(url)
      .then((response) => {
        const results = response.data.results;

        if (results.length === 0)
          dispatch({
            type: "FETCH_MOVIE_REVIEWS_NOMORE",
          });

        else
          dispatch({
            type: "FETCH_MOVIE_REVIEWS_FULFILLED",
            payload: results,
          });
      })
      .catch((err) => {
        dispatch({type: "FETCH_MOVIE_REJECTED", payload: err});
      })
  }
}