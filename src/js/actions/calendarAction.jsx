import axios from "axios";

import getTmdbAPIKey from '../api';
import { cleanCalendarData as clean } from './dataProcess';

export const fetchMovies = (year, page, limit=20) => {
  const event = "FETCH_CALENDAR_MOVIES_FULFILLED";

  const domain = 'https://api.themoviedb.org/3/discover/movie';
  const url = domain + '?primary_release_year=' + year + '&api_key=' + getTmdbAPIKey() +
                '&page=' + page;
  return fetch(event, url, year, limit);
}

export const fetchSeries = (year, page, limit=20) => {
  const event = "FETCH_CALENDAR_SERIES_FULFILLED";

  const domain = 'https://api.themoviedb.org/3/discover/tv';
  const url = domain + '?api_key=' + getTmdbAPIKey() + '&page=' + page +
              '&sort_by=popularity.desc&first_air_date_year=' + year;

  return fetch(event, url, year, limit);
}


const fetch = (event, url, year, limit) => {
  return (dispatch) => {
    dispatch({type: "FETCH_CALENDAR"});

    axios.get(url)
      .then((response) => {
        dispatch({
          type: event,
          payload: clean(response.data.results, year.toString(), limit)
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