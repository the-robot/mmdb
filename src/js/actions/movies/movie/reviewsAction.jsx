// Get movie cast informations
import axios from "axios";
import { getAPI } from "../../../api";

export const getReviews = (id, page) => {
  return (dispatch) => {
    dispatch({type: "FETCH_MOVIE_REVIEWS"});

    const url = getAPI() + '/movies/reviews/' + id + '/' + page;
    
    axios.get(url)
      .then((response) => {
        const results = response.data;

        if (results.length === 0)
          dispatch({
            type: "FETCH_MOVIE_REVIEWS_NOMORE",
          });

        else
          dispatch({
            type: "FETCH_MOVIE_REVIEWS_FULFILLED",
            payload: results,
          });
      })
      .catch((err) => {
        dispatch({type: "FETCH_MOVIE_REJECTED", payload: err});
      })
  }
}