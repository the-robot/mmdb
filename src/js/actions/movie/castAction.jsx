// Get movie cast informations

import axios from "axios";

import getTmdbAPIKey from '../../api';

export const getCast = (id) => {
  return (dispatch) => {
    const domain = 'https://api.themoviedb.org/3/movie/';
    const url = domain + id + '/credits?api_key=' + getTmdbAPIKey();

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_MOVIE_CAST_FULFILLED",
          payload: clean(response.data.cast),
        });
      })
      .catch((err) => {
        dispatch({type: "FETCH_MOVIE_REJECTED", payload: err});
      })
  }
}

function clean(data) {
  const PROFILE_PATH = 'https://image.tmdb.org/t/p/original';

  for (let i=0; i<data.length; i++) {
    if (data[i].profile_path === null)
      data[i].profile_path = '../../../images/unknown_profile.jpg';
    
    else
      data[i].profile_path = PROFILE_PATH + data[i].profile_path;
  }

  return data;
}