import axios from "axios";

import { getAPI } from '../../api';
import { fetch as fetchSeason } from './seasonAction';

export const fetch = (id) => {
  return (dispatch) => {
    dispatch({type: "FETCH_SERIES"});
    const url = getAPI() + '/series/detail/' + id;

    axios.get(url)
      // fetch series overall information
      .then((response) => {
        let data = response.data;
        dispatch({
          type: "FETCH_SERIES_FULFILLED",
          payload: data,
        });

        return data;
      })

      // fetch information of individual seasons
      .then((data) => {
        for (let i=1; i<=data.number_of_season; i++) {
          dispatch(fetchSeason(data.id, i));
        }
      })

      .catch((err) => {
        dispatch({type: "FETCH_SERIES_REJECTED", payload: err});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_SERIES_DATA'});
  }
}