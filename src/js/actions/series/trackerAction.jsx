import { getAPI, getAPIAuthPrefix } from '../../api';
import axios from 'axios';

export const isTracked = (token, series_id) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/series/tracker/tracked', {series_id: series_id}, config)
      .then((response) => {
        if (response.data.tracker)
          dispatch({type: "SHOW_TRACKER_SUCCESS", payload: response.data.tracker});
      })

      .catch((err) => {
        dispatch({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}

export const setWatching = (token, series) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/series/tracker/watching', {series: series}, config)
      .then((response) => {
        dispatch({type: "SHOW_TRACKER_SUCCESS", payload: 'Watching'});
      })

      .catch((err) => {
        dispatch({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}
export const setPlanning = (token, series) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/series/tracker/planning', {series: series}, config)
      .then((response) => {
        dispatch({type: "SHOW_TRACKER_SUCCESS", payload: 'Planning'});
      })

      .catch((err) => {
        dispatch({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}

export const setComplete = (token, series) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/series/tracker/complete', {series: series}, config)
      .then((response) => {
        dispatch({type: "SHOW_TRACKER_SUCCESS", payload: 'Complete'});
      })

      .catch((err) => {
        dispatch({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}

export const setDropped = (token, series) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/series/tracker/dropped', {series: series}, config)
      .then((response) => {
        dispatch({type: "SHOW_TRACKER_SUCCESS", payload: 'Dropped'});
      })

      .catch((err) => {
        dispatch({type: "SHOW_TRACKER_FAILED", payload: err.response.data});
      })
  }
}

export const remove = (token, series) => {
  return (dispatch) => {
    const api = axios.create({baseURL: getAPI()});
    let config = {
      headers: {'Authorization': getAPIAuthPrefix() + token}
    };

    api.post('/series/tracker/untrack', {series: series}, config)
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