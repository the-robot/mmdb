// Get youtube id of trailer for given tv series id
import axios from "axios";
import { getAPI } from "../../api";

export const getTrailer = (id) => {
  return (dispatch) => {
    const url = getAPI() + '/series/trailer/' + id;

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_SERIES_TRAILER_FULFILLED",
          payload: response.data
        });

      })
      .catch((err) => {
        dispatch({type: "FETCH_SERIES_REJECTED", payload: err});
      })
  }
}