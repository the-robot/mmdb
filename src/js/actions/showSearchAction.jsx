import axios from "axios";
import { getAPI } from '../api';

export const searchMovies = (query) => {
  const url = getAPI() + '/movies/search/' + query;
  return search(url);
}

export const searchSeries = (query) => {
  const url = getAPI() + '/series/search/' + query;
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
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({type: "SEARCH_SHOWS_REJECTED", payload: err});
      })
  }
}