import { getAPI, getAPIAuthPrefix } from '../../api';
import axios from 'axios';

export const isTracked = (token, movie_id) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/movies/tracker/tracked', {movie_id: movie_id}, config)
      .then((response) => {
        if (response.data.tracker)
          dispatch({type: "SHOW_TRACKER_SUCCESS", payload: response.data.tracker});
      })

      .catch((err) => {
        dispatch({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}

export const setWatching = (token, movie) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/movies/tracker/watching', {movie: movie}, config)
      .then((response) => {
        dispatch({type: "SHOW_TRACKER_SUCCESS", payload: 'Watching'});
      })

      .catch((err) => {
        dispatch({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}
export const setPlanning = (token, movie) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/movies/tracker/planning', {movie: movie}, config)
      .then((response) => {
        dispatch({type: "SHOW_TRACKER_SUCCESS", payload: 'Planning'});
      })

      .catch((err) => {
        dispatch({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}

export const setComplete = (token, movie) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/movies/tracker/complete', {movie: movie}, config)
      .then((response) => {
        dispatch({type: "SHOW_TRACKER_SUCCESS", payload: 'Complete'});
      })

      .catch((err) => {
        dispatch({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}

export const setDropped = (token, movie) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/movies/tracker/dropped', {movie: movie}, config)
      .then((response) => {
        dispatch({type: "SHOW_TRACKER_SUCCESS", payload: 'Dropped'});
      })

      .catch((err) => {
        dispatch({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}

export const remove = (token, movie) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/movies/tracker/untrack', {movie: movie}, config)
      .then((response) => {
        dispatch({type: "RESET_SHOW_TRACKER"});
      })

      .catch((err) => {
        dispatch({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: "RESET_SHOW_TRACKER"});
  }
}