import axios from 'axios';

import { getAPI, getAPIAuthPrefix } from '../../api';

export const get_movie_tracker = (username, tracker, page) => {
  let url = '/users/tracker/movie/';
  let data = {username: username, tracker_status: tracker, page: page}
  return get_tracker(url, data);
}

export const get_series_tracker = (username, tracker, page) => {
  let url = '/users/tracker/series/';
  let data = {username: username, tracker_status: tracker, page: page}
  return get_tracker(url, data);
}

const get_tracker = (url, data) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()})
    api.post(url, data)
      .then((response) => {
        dispatch({type: "PROFILE_LIBRARY_FULFILLED", payload: response});
      })

      .catch((err) => {
        dispatch({type: "PROFILE_LIBRARY_REJECTED", payload: err});
      })
  } 
}

export const reset_library = () => {
  return (dispatch) => {
    dispatch({type: "RESET_PROFILE_LIBRARY"});
  }
}