import axios from "axios";

import getTmdbAPIKey from '../api';
import { cleanShowData as clean } from './dataProcess';

// Movie Methods
export const initMovieYear = (year) => {
  return (dispatch) => {
    var init = {};
    init[year] = [];

    dispatch({
      type: "INIT_CALENDAR_MOVIES_BY_YEARS",
      payload: init,
    })
  }
}

export const fetchMovies = (year, page) => {
  const event = "FETCH_CALENDAR_MOVIES_FULFILLED";

  const domain = 'https://api.themoviedb.org/3/discover/movie';
  const url = domain + '?primary_release_year=' + year + '&api_key=' + getTmdbAPIKey() +
                '&page=' + page + "&sort_by=popularity.desc";

  console.log("URL", url);

  return fetch(event, url, year);
}

export const deleteMoviesExcept = (year) => {
  return (dispatch) => {
    dispatch({type: "DELETE_CALENDAR_MOVIES_EXPECT_YEAR", payload: year})
  }
}

export const fetchSeries = (year, page) => {
  const event = "FETCH_CALENDAR_SERIES_FULFILLED";

  const domain = 'https://api.themoviedb.org/3/discover/tv';
  const url = domain + '?api_key=' + getTmdbAPIKey() + '&page=' + page +
              '&sort_by=popularity.desc&first_air_date_year=' + year;

  return fetch(event, url, year);
}


// Series Methods
const fetch = (event, url, year) => {
  return (dispatch) => {
    dispatch({type: "FETCH_CALENDAR"});

    axios.get(url)
      .then((response) => {
        let data = {};
        data[year] = clean(response.data.results);

        dispatch({
          type: event,
          payload: data
        });
      })
      .catch((err) => {
        dispatch({type: "FETCH_CALENDAR_REJECTED", payload: err});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_CALENDAR_DATA'});
  }
}