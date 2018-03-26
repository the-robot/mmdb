import { message } from 'antd';
import axios from "axios";

import { getAPI } from '../../api';

export const login = (username, password) => {
  return (dispatch) => {
    dispatch({type: "ATUH_GET_TOKEN"});

    const api = axios.create({baseURL: getAPI()});
    api.post('/api/auth/token/obtain/', {'username': username, 'password': password})
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

export const logout = () => {
  return (dispatch) => {
    dispatch({type: "AUTH_DEL_TOKEN"});
  }
}

export const refresh_token = (token) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()})
    api.post('/api/auth/token/refresh/', {'refresh': token})
      .then((response) => {
        dispatch({type: "AUTH_REFRESH_TOKEN_FULFILLED", payload: response.data});
      })

      .catch((err) => {
        dispatch({type: "AUTH_REFRESH_TOKEN_REJECTED", payload: err});
      })
  }
}