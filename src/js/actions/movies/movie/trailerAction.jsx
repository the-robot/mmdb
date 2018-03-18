// Get youtube id of trailer for given movie id
import axios from "axios";
import { getAPI } from "../../../api";

export const getTrailer = (id) => {
  return (dispatch) => {
    dispatch({type: "FETCH_MOVIE"});
    const url = getAPI() + '/movies/trailer/' + id;

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_MOVIE_TRAILER_FULFILLED",
          payload: response.data
        });

      })
      .catch((err) => {
        dispatch({type: "FETCH_MOVIE_REJECTED", payload: err});
      })
  }
}