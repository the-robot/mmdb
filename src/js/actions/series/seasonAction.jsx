import axios from "axios";
import { getAPI } from '../../api';

export const fetch = (id, season_number) => {
  return (dispatch) => {
    dispatch({type: "FETCH_SERIES"});

    const url = getAPI() + '/series/detail/' + id + '/' + season_number
    axios.get(url)
      .then((response) => {
          dispatch({
            type: "FETCH_SERIES_SEASON_INFO_FULFILLED",
            payload: response.data
          });
      })

      .catch((err) => {
        dispatch({type: "FETCH_SERIES_REJECTED", payload: err});
      })
  }
}
