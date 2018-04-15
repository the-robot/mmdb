import axios from 'axios';

import { getAPI } from '../../api';

export const get_profile = (username) => {
  return (dispatch) => {
    var data = {username: username}
    const api = axios.create({baseURL: getAPI()})
    api.post('/users/profile/', data)
      .then((response) => {
        var data = response.data;

        // if not null, get domain name to avatar path
        if (data.avatar != null) {
          data.avatar = getAPI() + data.avatar;
        }

        dispatch({type: "PROFILE_GET_FULFILLED", payload: response.data});
      })

      .catch((err) => {
        dispatch({type: "PROFILE_GET_REJECTED", payload: err.response});
      })
  }
}

export const reset_profile = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_PROFILE'});
  }
}

// get list of recently added shows to library by given user
export const get_recent_shows = (username) => {
  var data = {username: username}
  const api = axios.create({baseURL: getAPI()})
  return api.post('/users/tracker/recent/', data);
}