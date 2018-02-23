import axios from "axios";

import getTmdbAPIKey from '../api';
import validate from './dataValidator';

export function fetch(year, page, limit=20) {
  return (dispatch) => {
    dispatch({type: "FETCH_CALENDAR"});

    const domain = 'https://api.themoviedb.org/3/discover/movie?primary_release_year=';
    const url = domain + year + '&api_key=' + getTmdbAPIKey() + '&page=' + page;

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_CALENDAR_FULFILLED",
          payload: clean(response.data.results, year.toString(), limit)
        });
      })
      .catch((err) => {
        dispatch({type: "FETCH_CALENDAR_REJECTED", payload: err});
      })
  }
}

function clean(data, year, limit) {
  const POSTER_SIZES = [
    "w92",
    "w154",
    "w185",
    "w342",
    "w500",
    "w780",
    "original"
  ]
  const POSTER_PATH = 'https://image.tmdb.org/t/p/' + POSTER_SIZES[3];

  const BACKCOVER_SIZES = [
    "w300",
    "w780",
    "w1280",
    "original"
  ]
  const BACKCOVER_PATH = 'https://image.tmdb.org/t/p/' + BACKCOVER_SIZES[3];

  var results = {};
  results[year] = [];

  for (let i=0; i<limit; i++) {
    // filter and remove invalid data
    if (!validate(data[i]))
      continue;

    results[year].push({
      id: data[i].id,
      title: data[i].title,
      release_date: data[i].release_date,
      language: data[i].original_language,
      summary: data[i].overview,
      rating: data[i].vote_average,
      poster: POSTER_PATH + data[i].poster_path,
      backcover: BACKCOVER_PATH + data[i].backdrop_path,
    });
  }

  return results;
}