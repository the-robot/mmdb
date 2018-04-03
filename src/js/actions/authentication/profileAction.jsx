import axios from 'axios';

import { getAPI, getAPIAuthPrefix } from '../../api';

export const get_profile = (token) => {
  return (dispatch) => {
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    const api = axios.create({baseURL: getAPI()})
    api.post('/users/profile/', {}, config)
      .then((response) => {
        var data = response.data;

        // if not null, get domain name to avatar path
        if (data.avatar != null) {
          data.avatar = getAPI() + data.avatar;
        }

        dispatch({type: "PROFILE_GET_FULFILLED", payload: response.data});
      })

      .catch((err) => {
        dispatch({type: "PROFILE_GET_REJECTED", payload: err});
      })
  }
}
