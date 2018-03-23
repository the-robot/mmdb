import { message } from 'antd';
import axios from "axios";

import { getAPI } from '../api';

export const signup = (values) => {
  return (dispatch) => {
    dispatch({type: "REGISTRATION_SENDING"});

    const api = axios.create({baseURL: getAPI()})
    api.post('/users/registration/', values)
      .then((response) => {
        dispatch({type: "REGISTRATION_SIGNUP_SUCCESS", payload: response.data['username']});
      })

      .catch((err) => {
        // show error message to user
        message.error(err.response.data);
        dispatch({type: "REGISTRATION_SIGNUP_REJECTED", payload: err.response});
      })
  }
}

export const profile_setup = (values) => {
  return (dispatch) => {
    dispatch({type: "REGISTRATION_SENDING"});

    const api = axios.create({baseURL: getAPI()})
    api.post('/users/registration/profile', values)
      .then((response) => {
        dispatch({type: "REGISTRATION_PROFILE_SETUP_SUCCESS"});
      })

      .catch((err) => {
        // show error message to user
        message.error(err.response.data)
        dispatch({type: "REGISTRATION_PROFILE_SETUP_REJECTED", payload: err.response});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_REGISTRATION'});
  }
}