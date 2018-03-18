import axios from "axios";
import { getAPI } from '../../api';

export const fetch = (page) => {
  const url = getAPI() + '/movies/intheatre/' + page;

  return (dispatch) => {
    dispatch({type: "FETCH_MOVIES_INTHEATRES"});

    axios.get(url)
      .then((response) => {
        var results = response.data;

        if (results.length == 0) {
          dispatch({
            type: "FETCH_MOVIES_INTHEATRES_ALL_FETCHED",
          });
        }

        else {
          dispatch({
            type: "FETCH_MOVIES_INTHEATRES_FULFILLED",
            payload: results,
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