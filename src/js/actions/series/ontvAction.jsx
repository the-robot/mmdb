import axios from "axios";
import { getAPI } from '../../api';

export const fetch = (page) => {
  const url = getAPI() + '/series/ontv/' + page;

  return (dispatch) => {
    dispatch({type: "FETCH_SERIES_ONTV"});

    axios.get(url)
      .then((response) => {
        var results = response.data;

        if (results.length == 0) {
          dispatch({
            type: "FETCH_SERIES_ONTV_ALL_FETCHED",
          });
        }

        else {
          dispatch({
            type: "FETCH_SERIES_ONTV_FULFILLED",
            payload: results,
          });
        }
      })
      .catch((err) => {
        dispatch({type: "FETCH_SERIES_ONTV_REJECTED", payload: err});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_FETCH_SERIES_ONTV'});
  }
}