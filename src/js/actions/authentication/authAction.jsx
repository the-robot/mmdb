import { message } from 'antd';
import axios from "axios";

import { getAPI } from '../../api';

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
      headers: {'Authorization': "JWT " + token}
    };

    const api = axios.create({baseURL: getAPI()});
    api.post('/users/logout/', {}, config)
      .then((response) => {
        dispatch({type: "AUTH_DEL_TOKEN"});
      })

      .catch((err) => {
        console.log("ERR", err.response);
        if ('detail' in err.response.data)
          message.error(err.response.data['detail'])
        else
          message.error("Unknown error occurred. Please contact the staffs.")
      })
  }
}

export const refresh_token = (token) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()})
    api.post('/users/login/refresh/', {'refresh': token})
      .then((response) => {
        dispatch({type: "AUTH_TOKEN_REFRESH_FULFILLED", payload: response.data});
      })

      .catch((err) => {
        dispatch({type: "AUTH_TOKEN_REFRESH_REJECTED", payload: err});
      })
  }
}

// method to be called before token renewal
export function isAccessTokenExpired(access) {
  if (access && access.exp) {
    return (1000 * access.exp - (new Date()).getTime()) < 5000;
  }
  return true
}