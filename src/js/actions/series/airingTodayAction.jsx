import axios from "axios";
import { getAPI } from '../../api';

export const fetch = (page) => {
  const url = getAPI() + '/series/airing/' + page;

  return (dispatch) => {
    dispatch({type: "FETCH_SERIES_AIRING_TODAY"});

    axios.get(url)
      .then((response) => {
        var results = response.data;

        if (results.length == 0) {
          dispatch({
            type: "FETCH_SERIES_AIRING_TODAY_ALL_FETCHED",
          });
        }

        else {
          dispatch({
            type: "FETCH_SERIES_AIRING_TODAY_FULFILLED",
            payload: results,
          });
        }
      })
      .catch((err) => {
        dispatch({type: "FETCH_SERIES_AIRING_TODAY_REJECTED", payload: err});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_SERIES_AIRING_TODAY'});
  }
}