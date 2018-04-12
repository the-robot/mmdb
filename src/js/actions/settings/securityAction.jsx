import { getAPI, getAPIAuthPrefix } from '../../api';
import axios from 'axios';

export const update_password = (token, data) => {
  let config = {
    headers: {
      'Authorization': getAPIAuthPrefix() + token,
    }
  };

  const api = axios.create({baseURL: getAPI()});
  return api.post('/users/password-update/', data, config);
}