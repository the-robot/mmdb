import { message } from 'antd';
import axios from "axios";

import { getAPI } from '../../api';

export const signup = (values) => {
  return (dispatch) => {
    dispatch({type: "REGISTRATION_SENDING"});

    const api = axios.create({baseURL: getAPI()})
    api.post('/api/users/create/', values)
      .then((response) => {
        dispatch({type: "REGISTRATION_SIGNUP_SUCCESS", payload: response.data['username']});
      })

      .catch((err) => {
        // show error message to user
        console.log(err.response.data)
        if ('email' in err.response.data)
          message.error(err.response.data['email'][0])

        else if ('username' in err.response.data)
          message.error(err.response.data['username'][0])
        
        else if ('password' in err.response.data)
          message.error(err.response.data['password'][0])

        dispatch({type: "REGISTRATION_SIGNUP_REJECTED", payload: err.response.data});
      })
  }
}

export const profile_setup = (values) => {
  return (dispatch) => {
    dispatch({type: "REGISTRATION_SENDING"});

    // Create Form Data
    let data = new FormData();
    data.append('username', values['username']);
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
        "Content-Type": "multipart/form-data"
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

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_REGISTRATION'});
  }
}