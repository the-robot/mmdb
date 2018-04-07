import axios from 'axios';

import { getAPI, getAPIAuthPrefix } from '../../api';

export const get_movie_tracker = (username, tracker, page) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()})
    api.post('/users/tracker/movie/', {username: username, tracker_status: tracker, page: page})
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