// Get tv series cast informations

import axios from "axios";

import getTmdbAPIKey from '../../api';

export const getCast = (id, season) => {
  return (dispatch) => {
    const domain = 'https://api.themoviedb.org/3/tv/';
    const url = domain + id + '/season/' + season + '/credits?api_key=' + getTmdbAPIKey();

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_SERIES_CAST_FULFILLED",
          payload: clean(response.data.cast),
        });
      })
      .catch((err) => {
        dispatch({type: "FETCH_SERIES_REJECTED", payload: err});
      })
  }
}

const clean = (data) => {
  const PROFILE_PATH = 'https://image.tmdb.org/t/p/original';

  for (let i=0; i<data.length; i++) {
    if (data[i].profile_path === null)
      data[i].profile_path = '../../../images/unknown_profile.jpg';
    
    else
      data[i].profile_path = PROFILE_PATH + data[i].profile_path;
  }

  return data;
}