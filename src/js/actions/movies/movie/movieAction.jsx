import axios from "axios";
import { getAPI } from "../../../api";

export const fetch = (id) => {
  return (dispatch) => {
    dispatch({type: "FETCH_MOVIE"});
    const url = getAPI() + '/movies/detail/' + id;

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_MOVIE_FULFILLED",
          payload: response.data
        });
      })

      .catch((err) => {
        dispatch({type: "FETCH_MOVIE_REJECTED", payload: err});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_MOVIE_DATA'});
  }
}