import { getAPI, getAPIAuthPrefix } from '../../api';
import { message } from 'antd';
import axios from 'axios';

export const update_profile = (token, values) => {
  return (dispatch) => {
    let config = {
      headers: {
        "accept": "application/json",
        "Content-Type": "multipart/form-data",
        'Authorization': getAPIAuthPrefix() + token,
      }
    };

    let data = new FormData();
    data.append('name', values['name']);
    data.append('gender', values['gender']);
    data.append('birthday', values['birthday']);
    data.append('location', values['location']);
    data.append('description', values['description']);

    if (values['avatar'] != undefined)
      data.append('avatar', values['avatar'], values['avatar'].name);

    const api = axios.create({baseURL: getAPI()});
    api.post('/users/profile/update/', data, config)
      .then((response) => {
        if (response) {
          let data = response.data;
          if (data['avatar'] != null)
            data['avatar'] = getAPI() + data['avatar'];

          dispatch({type: 'PROFILE_DATA_UPDATED', payload: data});

          // update the profile information in page header
          dispatch({type: "AUTH_UPDATE_USER_INFO_FULFILLED", payload: data});
        }

        message.success('Profile updated');
      })

      .catch((err) => {
        message.error(err.response.data);
      })
  }
}