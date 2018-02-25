import axios from "axios";

import getTmdbAPIKey from '../../api';

// Example
// https://api.themoviedb.org/3/movie/433310?api_key=c2e52c8843976552b7b2a62976977c3f

export const fetch = (id) => {
  return (dispatch) => {
    dispatch({type: "FETCH_MOVIE"});

    const domain = 'https://api.themoviedb.org/3/movie/';
    const url = domain + id + '?api_key=' + getTmdbAPIKey();

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_MOVIE_FULFILLED",
          payload: clean(response.data)
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

function clean(data) {
  const POSTER_PATH = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';

  var result = {
    id: data.id,
    title: data.title,
    release_date: data.release_date,
    status: data.status,
    language: data.spoken_languages[0]['name'],
    runtime: timeFormat(data.runtime),
    pg: (data.adult ? 'PG18' : 'PG13'),
    homepage: data.homepage,
    summary: data.overview,
    rating: percentage(data.vote_average, 10),
    genres: getGenres(data.genres),
    poster: POSTER_PATH + data.poster_path,
  };

  return result;
}

function percentage(number, max) {
  return Math.ceil((number * 100) / max);
}

function getGenres(data) {
  var genres = [];

  for (let i=0; i<data.length; i++)
    genres.push(data[i]['name']);

  return genres;
}

function timeFormat(minute) {
  var hour = Math.floor(minute / 60);
  var min = minute % 60;

  return hour + "h " + min + "min";
}