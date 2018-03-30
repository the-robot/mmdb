import { getAPI, getAPIAuthPrefix } from '../../api';
import axios from 'axios';

export const setWatching = (token, movie) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/users/tracker/movie/watching', {movie: movie}, config)
      .then((response) => {
        dispatch({type: "SHOW_TRACKER_SUCCESS", payload: 'Watching'});
      })

      .catch((err) => {
        dispatct({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}

export const setPlanning = (token, movie) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/users/tracker/movie/planning', {movie: movie}, config)
      .then((response) => {
        dispatch({type: "SHOW_TRACKER_SUCCESS", payload: 'Planning'});
      })

      .catch((err) => {
        dispatct({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}

export const setComplete = (token, movie) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/users/tracker/movie/complete', {movie: movie}, config)
      .then((response) => {
        dispatch({type: "SHOW_TRACKER_SUCCESS", payload: 'Complete'});
      })

      .catch((err) => {
        dispatct({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}

export const setDropped = (token, movie) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/users/tracker/movie/dropped', {movie: movie}, config)
      .then((response) => {
        dispatch({type: "SHOW_TRACKER_SUCCESS", payload: 'Dropped'});
      })

      .catch((err) => {
        dispatct({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}

export const remove = (token, movie) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/users/tracker/movie/untrack', {movie: movie}, config)
      .then((response) => {
        dispatch({type: "RESET_SHOW_TRACKER"});
      })

      .catch((err) => {
        dispatct({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}