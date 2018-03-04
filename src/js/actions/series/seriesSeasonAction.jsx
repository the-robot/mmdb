import axios from "axios";

import getTmdbAPIKey from '../../api';
import getDate from '../dataProcess';

export const fetch = (id, season_number) => {
  return (dispatch) => {
    dispatch({type: "FETCH_SERIES"});

    const domain = 'https://api.themoviedb.org/3/tv/';
    const url = domain + id + 'season/' + season_number
                + '?api_key=' + getTmdbAPIKey();

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_SERIES_SEASON_DETAIL_FULFILLED",
          payload: clean(response.data)
        });
      })

      .catch((err) => {
        dispatch({type: "FETCH_SERIES_REJECTED", payload: err});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_SEASON_DETAILS_DATA'});
  }
}

function clean(data) {
  const POSTER_PATH = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';

  var result = {
    id: data.id,
    season_number: data.season_number,
    title: data.name,
    air_date: getDate(data.air_date),
    summary: data.overview,
    poster: POSTER_PATH + data.poster_path,
    episodes: data.episodes,
  };

  return result;
}

