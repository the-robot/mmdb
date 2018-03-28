import { message } from 'antd';
import axios from "axios";

import { getAPI, getAPIAuthPrefix } from '../../api';

// method to be called before token renewal
export function isTokenExpired(expire) {
  return (expire - (new Date()).getTime()) < 5000;
}


export const login = (username, password) => {
  return (dispatch) => {
    dispatch({type: "AUTH_GET_TOKEN"});

    const api = axios.create({baseURL: getAPI()});
    api.post('/users/login/', {'username': username, 'password': password})
      .then((response) => {
        dispatch({type: "AUTH_GET_TOKEN_FULFILLED", payload: response.data});
      })

      .catch((err) => {
        // show error message to user
        message.error("Username or password is incorrect")
        dispatch({type: "AUTH_GET_TOKEN_REJECTED", payload: err});
      })
  }
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