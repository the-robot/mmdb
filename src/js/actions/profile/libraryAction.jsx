import axios from 'axios';

import { getAPI, getAPIAuthPrefix } from '../../api';

export const get_tracker_count = (username, tracker_type) => {
  let data = {username: username, tracker_type: tracker_type};

  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    api.post('/users/tracker/count/', data)
      .then((response) => {
        dispatch({type: 'PROFILE_LIBRARY_TRACKER_COUNT', payload: response.data});
      })
    
      .catch((err) => {
        dispatch({type: 'PROFILE_LIBRARY_REJECTED', payload: err});
      })
  }
}

export const get_movie_tracker = (username, tracker, page) => {
  let url = '/users/tracker/movie/';
  let data = {username: username, tracker_status: tracker, page: page};
  return get_tracker(url, data);
}

export const get_series_tracker = (username, tracker, page) => {
  let url = '/users/tracker/series/';
  let data = {username: username, tracker_status: tracker, page: page};
  return get_tracker(url, data);
}

export const reset_library = () => {
  return (dispatch) => {
    dispatch({type: "RESET_PROFILE_LIBRARY"});
  }
}

export const reset_library_data = () => {
  return (dispatch) => {
    dispatch({type: "RESET_PROFILE_LIBRARY_DATA"});
  }
}

const get_tracker = (url, data) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    api.post(url, data)
      .then((response) => {
        dispatch({type: "PROFILE_LIBRARY_FULFILLED", payload: response.data});
      })

      .catch((err) => {
        dispatch({type: "PROFILE_LIBRARY_REJECTED", payload: err});
      })
  } 
}