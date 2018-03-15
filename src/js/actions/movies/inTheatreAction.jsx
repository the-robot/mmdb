import axios from "axios";

import { cleanShowData as clean } from '../dataProcess';
import getTmdbAPIKey from '../../api';

export const fetch = (page) => {
  const domain = "https://api.themoviedb.org/3/movie/now_playing?api_key=";
  const url = domain + getTmdbAPIKey() + "&page=" + page;

  return (dispatch) => {
    dispatch({type: "FETCH_MOVIES_INTHEATRES"});

    axios.get(url)
      .then((response) => {
        var results = response.data.results;

        if (results.length == 0) {
          dispatch({
            type: "FETCH_MOVIES_INTHEATRES_ALL_FETCHED",
          });
        }

        else {
          dispatch({
            type: "FETCH_MOVIES_INTHEATRES_FULFILLED",
            payload: clean(response.data.results),
          });
        }
      })
      .catch((err) => {
        dispatch({type: "FETCH_MOVIES_INTHEATRES_REJECTED", payload: err});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_MOVIES_INTHEATRES'});
  }
}