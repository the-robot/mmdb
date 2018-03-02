import axios from "axios";

import getTmdbAPIKey from '../api';
import { cleanMovieData as clean } from './dataProcess';

export const fetch = (year, page) => {
  return (dispatch) => {
    dispatch({type: "FETCH_MOVIES"});

    const domain = 'https://api.themoviedb.org/3/discover/movie?primary_release_year=';
    const url = domain + year + '&api_key=' + getTmdbAPIKey() + '&page=' + page;

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_MOVIES_FULFILLED",
          payload: clean(response.data.results)
        });

        // update page if successful
        dispatch({type: 'UPDATE_MOVIES_PAGE'});
      })
      .catch((err) => {
        dispatch({type: "FETCH_MOVIES_REJECTED", payload: err});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_MOVIES_DATA'});
  }
}