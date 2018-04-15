import { message } from 'antd';
import axios from "axios";

import { getAPI, getAPIAuthPrefix } from '../../api';

export const signup = (values) => {
  const api = axios.create({baseURL: getAPI()})
  return api.post('/api/users/create/', values);
}

// for profile setup
export const get_token = (username, password) => {
  const api = axios.create({baseURL: getAPI()});
  return api.post('/users/login/', {'username': username, 'password': password});
}

export const profile_setup = (token, values) => {
  return (dispatch) => {
    dispatch({type: "REGISTRATION_SENDING"});

    // Create Form Data
    let data = new FormData();
    data.append('name', values['name']);

    if (values['description'] != undefined)
      data.append('description', values['description']);

    if (values['avatar'] != undefined)
      data.append('avatar', values['avatar'], values['avatar'].name);
    
    if (values['gender'] != undefined)
      data.append('gender', values['gender']);
    
    if (values['birthday'] != undefined)
      data.append('birthday', values['birthday'].format('YYYY-MM-DD'));
    
    if (values['location'] != undefined)
      data.append('location', values['location']);

    let config = {
      headers : {
        "accept": "application/json",
        "Content-Type": "multipart/form-data",
        "Authorization": getAPIAuthPrefix() + token
      }
    }

    const api = axios.create({baseURL: getAPI()})
    api.post('/users/registration/profile/', data, config)
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

export const remove_token = (token) => {
  return (dispatch) => {
    dispatch({type: 'REGISTRATION_REMOVE_TOKEN'});

    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    const api = axios.create({baseURL: getAPI()});
    api.post('/users/logout/', {}, config)
      .then((response) => {
        ;
      })

      .catch((err) => {
        dispatch({type: "REGISTRATION_PROFILE_SETUP_REJECTED", payload: err.response});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_REGISTRATION'});
  }
}