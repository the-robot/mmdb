import { getAPI, getAPIAuthPrefix } from '../../api';
import axios from 'axios';

export const reset_library = (token) => {
  let config = {
    headers: {
      'Authorization': getAPIAuthPrefix() + token,
    }
  };

  const api = axios.create({baseURL: getAPI()});
  return api.post('/users/tracker/delete/', {}, config);
}