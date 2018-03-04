import axios from "axios";

import getTmdbAPIKey from '../api';
import { cleanShowData as clean } from './dataProcess';

export const fetchMovies = (year, page) => {
  const domain = 'https://api.themoviedb.org/3/discover/movie?primary_release_year=';
  const url = domain + year + '&api_key=' + getTmdbAPIKey() + '&page=' + page;

  return fetch(url, year);
}

export const fetchSeries = (year, page) => {
  const domain = 'https://api.themoviedb.org/3/discover/tv';
  const url = domain + '?api_key=' + getTmdbAPIKey() + '&page=' + page +
              '&sort_by=popularity.desc&first_air_date_year=' + year;
  
  return fetch(url, year);
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_SHOWS_DATA'});
  }
}


// Fetch data based on givne url and year
const fetch = (url, year) => {
  return (dispatch) => {
    dispatch({type: "FETCH_SHOWS"});

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_SHOWS_FULFILLED",
          payload: clean(response.data.results)
        });

        // update page if successful
        dispatch({type: 'UPDATE_SHOWS_PAGE'});
      })
      .catch((err) => {
        dispatch({type: "FETCH_SHOWS_REJECTED", payload: err});
      })
  }
}