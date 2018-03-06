import axios from "axios";

import getTmdbAPIKey from '../../api';
import { getDate, getGenres, getLanguages, getTime, toPercentage } from '../dataProcess';
import { fetch as fetchSeason } from './seasonAction';

export const fetch = (id) => {
  return (dispatch) => {
    dispatch({type: "FETCH_SERIES"});

    const domain = 'https://api.themoviedb.org/3/tv/';
    const url = domain + id + '?api_key=' + getTmdbAPIKey();

    axios.get(url)
      // fetch series overall information
      .then((response) => {
        let data = clean(response.data);

        dispatch({
          type: "FETCH_SERIES_FULFILLED",
          payload: data,
        });

        return data;
      })

      // fetch information of individual seasons
      .then((data) => {
        for (let i=1; i<=data.number_of_season; i++) {
          dispatch(fetchSeason(data.id, i));
        }
      })

      .catch((err) => {
        dispatch({type: "FETCH_SERIES_REJECTED", payload: err});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_SERIES_DATA'});
  }
}

function clean(data) {
  const POSTER_PATH = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';

  var result = {
    id: data.id,
    title: data.original_name,
    first_air_date: getDate(data.first_air_date),
    last_air_date: getDate(data.last_air_date),
    runtime: getTime(data.episode_run_time),
    homepage: data.homepage,
    summary: data.overview,
    rating: toPercentage(data.vote_average, 10),
    genres: getGenres(data.genres),
    poster: POSTER_PATH + data.poster_path,
    number_of_season: data.number_of_seasons,
    seasons: data.seasons,
  };

  return result;
}