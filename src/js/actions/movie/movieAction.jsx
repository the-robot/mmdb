import axios from "axios";

import { getDate, getGenres, getLanguages, getTime, toPercentage } from '../dataProcess';
import getTmdbAPIKey from '../../api';

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
    release_date: getDate(data.release_date),
    status: data.status,
    language: getLanguages(data.spoken_languages),
    runtime: getTime(data.runtime),
    pg: (data.adult ? 'PG18' : 'PG13'),
    homepage: data.homepage,
    summary: data.overview,
    rating: toPercentage(data.vote_average, 10),
    genres: getGenres(data.genres),
    poster: POSTER_PATH + data.poster_path,
  };

  return result;
}