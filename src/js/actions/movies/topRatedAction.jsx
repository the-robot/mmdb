import axios from "axios";

import { cleanShowData as clean } from '../dataProcess';
import getTmdbAPIKey from '../../api';

export const fetch = (page) => {
  const domain = "https://api.themoviedb.org/3/movie/top_rated?api_key=";
  const url = domain + getTmdbAPIKey() + "&page=" + page;

  return (dispatch) => {
    dispatch({type: "FETCH_MOVIES_TOPRATED"});

    axios.get(url)
      .then((response) => {
        var results = response.data.results;

        if (results.length == 0) {
          dispatch({
            type: "FETCH_MOVIES_TOPRATED_ALL_FETCHED",
          });
        }

        else {
          dispatch({
            type: "FETCH_MOVIES_TOPRATED_FULFILLED",
            payload: clean(response.data.results),
          });
        }
      })
      .catch((err) => {
        dispatch({type: "FETCH_MOVIES_TOPRATED_REJECTED", payload: err});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_MOVIES_TOPRATED'});
  }
}