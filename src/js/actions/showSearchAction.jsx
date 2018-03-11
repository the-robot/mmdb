import axios from "axios";

import getTmdbAPIKey from '../api';
import { cleanShowData as clean } from '../actions/dataProcess';


export const searchMovies = (query) => {
  const domain = 'https://api.themoviedb.org/3/search/movie';
  const url = domain + '?api_key=' + getTmdbAPIKey() + '&query=' + query;
  return search(url);
}

export const searchSeries = (query) => {
  const domain = 'https://api.themoviedb.org/3/search/tv';
  const url = domain + '?api_key=' + getTmdbAPIKey() + '&query=' + query;
  return search(url);
}

export const searchClear = () => {
  return (dispatch) => {
    dispatch({type: "SEARCH_SHOWS_CLEAR"});
  }
}

const search = (url) => {
  return (dispatch) => {
    dispatch({type: "SEARCH_SHOWS"});

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "SEARCH_SHOWS_FULFILLED",
          payload: clean(response.data.results).slice(0, 10)
        });
      })
      .catch((err) => {
        dispatch({type: "SEARCH_SHOWS_REJECTED", payload: err});
      })
  }
}