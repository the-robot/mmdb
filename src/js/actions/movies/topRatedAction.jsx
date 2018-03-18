import axios from "axios";

import { getAPI } from '../../api';

export const fetch = (page) => {
  const url = getAPI() + '/movies/toprated/' + page;

  return (dispatch) => {
    dispatch({type: "FETCH_MOVIES_TOPRATED"});

    axios.get(url)
      .then((response) => {
        var results = response.data;

        if (results.length == 0) {
          dispatch({
            type: "FETCH_MOVIES_TOPRATED_ALL_FETCHED",
          });
        }

        else {
          dispatch({
            type: "FETCH_MOVIES_TOPRATED_FULFILLED",
            payload: results,
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