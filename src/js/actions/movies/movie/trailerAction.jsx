// Get youtube id of trailer for given movie id

import axios from "axios";

import getTmdbAPIKey from '../../../api';

export const getTrailer = (id) => {
  return (dispatch) => {
    dispatch({type: "FETCH_MOVIE"});

    const domain = 'https://api.themoviedb.org/3/movie/';
    const url = domain + id + '/videos?api_key=' + getTmdbAPIKey() + '&language=en-US';

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_MOVIE_TRAILER_FULFILLED",
          payload: getYoutubeId(response.data.results)
        });

      })
      .catch((err) => {
        dispatch({type: "FETCH_MOVIE_REJECTED", payload: err});
      })
  }
}

function getYoutubeId(data) {
  for (let trailer of data) {
    if (trailer.type === 'Trailer')
      return trailer.key;
  }
  return '';
}