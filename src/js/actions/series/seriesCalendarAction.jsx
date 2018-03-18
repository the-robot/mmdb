import axios from "axios";
import { getAPI } from '../../api';

export const init = (year) => {
  return (dispatch) => {
    var payload = {};
    payload[year] = [];

    dispatch({
      type: "INIT_SERIES_CALENDAR",
      payload: payload,
    })
  }
}

export const fetch = (year, page) => {
  const url = getAPI() + '/series/calendar/' + year + '/' + page;

  return (dispatch) => {
    dispatch({type: "FETCH_SERIES_CALENDAR"});

    axios.get(url)
      .then((response) => {
        let data = {};
        data[year] = response.data;

        dispatch({
          type: "FETCH_SERIES_CALENDAR_FULFILLED",
          payload: data
        });
      })
      .catch((err) => {
        dispatch({type: "FETCH_SERIES_CALENDAR_REJECTED", payload: err});
      })
  }
}

export const deleteExcept = (year) => {
  return (dispatch) => {
    dispatch({type: "DELETE_SERIES_CALENDAR_EXPECT_YEAR", payload: year})
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_SERIES_CALENDAR_DATA'});
  }
}