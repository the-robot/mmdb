import axios from "axios";

import { getAPI } from '../../api';

export const login = () => {
  return (dispatch) => {
    dispatch({type: "ATUH_GET_TOKEN"});

    // for testing
    dispatch({type: "AUTH_GET_TOKEN_FULFILLED", payload: '123456'});
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({type: "AUTH_DEL_TOKEN"});
  }
}