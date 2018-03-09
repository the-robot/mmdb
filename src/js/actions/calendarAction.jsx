import axios from "axios";

import getTmdbAPIKey from '../api';
import { cleanShowData as clean } from './dataProcess';

// Init Years
export const initMovieYear = (year) => {
  var payload = {};
  payload[year] = [];
  return initYear("INIT_CALENDAR_MOVIES_BY_YEARS", payload);
}

export const initSeriesYear = (year) => {
  var payload = {};
  payload[year] = [];
  return initYear("INIT_CALENDAR_SERIES_BY_YEARS", payload);
}


// Fetch Methods
export const fetchMovies = (year, page) => {
  const event = "FETCH_CALENDAR_MOVIES_FULFILLED";
  const domain = 'https://api.themoviedb.org/3/discover/movie';
  const url = domain + '?primary_release_year=' + year + '&api_key=' + getTmdbAPIKey() +
                '&page=' + page + "&sort_by=popularity.desc";

  return fetch(event, url, year);
}

export const fetchSeries = (year, page) => {
  console.log("PAGE", page);

  const event = "FETCH_CALENDAR_SERIES_FULFILLED";
  const domain = 'https://api.themoviedb.org/3/discover/tv';
  const url = domain + '?api_key=' + getTmdbAPIKey() + '&page=' + page +
              '&sort_by=popularity.desc&first_air_date_year=' + year;

  return fetch(event, url, year);
}


// Delete Methods
export const deleteMoviesExcept = (year) => {
  return (dispatch) => {
    dispatch({type: "DELETE_CALENDAR_MOVIES_EXPECT_YEAR", payload: year})
  }
}

export const deleteSeriesExcept = (year) => {
  return (dispatch) => {
    dispatch({type: "DELETE_CALENDAR_SERIES_EXPECT_YEAR", payload: year})
  }
}


// Reset Methods
export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_CALENDAR_DATA'});
  }
}


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

const initYear = (event, payload) => {
  return (dispatch) => {

    dispatch({
      type: event,
      payload: payload,
    })
  }
}