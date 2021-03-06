import { message } from 'antd';
import axios from "axios";

import { getAPI, getAPIAuthPrefix } from '../../api';

// method to be called before token renewal
export function isTokenExpired(expire) {
  // if token expiration is less than 5 days, says expire
  return (expire - (new Date()).getTime()) < 450000000;
}


export const login = (username, password) => {
  const api = axios.create({baseURL: getAPI()});
  return api.post('/users/login/', {'username': username, 'password': password});
}

export const logout = (token) => {
  return (dispatch) => {
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    const api = axios.create({baseURL: getAPI()});
    api.post('/users/logout/', {}, config)
      .then((response) => {
        dispatch({type: "AUTH_DEL_TOKEN"});

        // reset profile data
        dispatch({type: "RESET_PROFILE"});
      })

      .catch((err) => {
        // user token is already expired, just delete saved token
        if (err.response.status === 401) {
          // delete expired session key and force logout
          //message.error("User session expired. Please login again.")
          dispatch({type: 'AUTH_DEL_TOKEN'});
        }

        else {
          if ('detail' in err.response.data)
            message.error(err.response.data['detail'])
          else
            message.error("Unknown error occurred. Please contact the staffs.")
        }
      })
  }
}

export const refresh_token = (token) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()})
    api.post('/users/login/refresh/', {'token': token})
      .then((response) => {
        dispatch({type: "AUTH_TOKEN_REFRESH_FULFILLED", payload: response.data});
      })

      .catch((err) => {
        dispatch({type: "AUTH_TOKEN_REFRESH_REJECTED", payload: err});
      })
  }
}