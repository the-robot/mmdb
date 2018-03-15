import axios from "axios";

import { cleanShowData as clean } from '../dataProcess';
import getTmdbAPIKey from '../../api';

export const init = (year) => {
  return (dispatch) => {
    var payload = {};
    payload[year] = [];

    dispatch({
      type: "INIT_MOVIE_CALENDAR",
      payload: payload,
    })
  }
}

export const fetch = (year, page) => {
  const domain = 'https://api.themoviedb.org/3/discover/movie';
  const url = domain + '?primary_release_year=' + year + '&api_key=' + getTmdbAPIKey() +
                '&page=' + page + "&sort_by=popularity.desc";

  return (dispatch) => {
    dispatch({type: "FETCH_MOVIE_CALENDAR"});

    axios.get(url)
      .then((response) => {
        let data = {};
        data[year] = clean(response.data.results);

        dispatch({
          type: "FETCH_MOVIE_CALENDAR_FULFILLED",
          payload: data
        });
      })
      .catch((err) => {
        dispatch({type: "FETCH_MOVIE_CALENDAR_REJECTED", payload: err});
      })
  }
}

export const deleteExcept = (year) => {
  return (dispatch) => {
    dispatch({type: "DELETE_MOVIE_CALENDAR_EXPECT_YEAR", payload: year})
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_MOVIE_CALENDAR_DATA'});
  }
}