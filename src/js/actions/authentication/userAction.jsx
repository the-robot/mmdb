// get basic user information
import axios from 'axios';

import { getAPI, getAPIAuthPrefix } from '../../api';

export const get_user_information = (token) => {
  return (dispatch) => {
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    const api = axios.create({baseURL: getAPI()})
    api.post('/users/profile/self/', {}, config)
      .then((response) => {
        var data = response.data;

        // if not null, get domain name to avatar path
        if (data.avatar != null) {
          data.avatar = getAPI() + data.avatar;
        }

        dispatch({type: "AUTH_GET_USER_INFO_FULFILLED", payload: response.data});
      })

      .catch((err) => {
        dispatch({type: "AUTH_GET_USER_INFO_REJECTED", payload: err});
      })
  }
}
