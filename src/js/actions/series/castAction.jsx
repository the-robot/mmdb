// Get tv series cast informations
import axios from "axios";
import { getAPI } from "../../api";

export const getCast = (id, season) => {
  return (dispatch) => {
    const url = getAPI() + '/series/cast/' + id + '/' + season;

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_SERIES_CAST_FULFILLED",
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({type: "FETCH_SERIES_REJECTED", payload: err});
      })
  }
}