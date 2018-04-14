// Get movie cast informations
import axios from "axios";
import { getAPI } from '../../../api';

export const getCast = (id) => {
  return (dispatch) => {
    dispatch({type: "FETCH_MOVIE_CAST"});

    const url = getAPI() + '/movies/cast/' + id;

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_MOVIE_CAST_FULFILLED",
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({type: "FETCH_MOVIE_REJECTED", payload: err});
      })
  }
}