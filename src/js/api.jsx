const API = 'http://localhost:8000';
const API_AUTH_PREFIX = 'MY_SECRET_JWT';

export const getAPI = () => {
  return API;
}

export const getAPIAuthPrefix = () => {
  // need whitespace between prefix and token
  return API_AUTH_PREFIX + " ";
}