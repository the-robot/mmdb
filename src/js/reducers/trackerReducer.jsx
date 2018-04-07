// get individual movie/show tracker status

const INIT_STATE = {
  tracker_state: 'Tracker',
  error: null,
}

export default function reducer(state=INIT_STATE, action) {

  switch (action.type) {
    case "SHOW_TRACKER_SUCCESS": {
      return {...state, tracker_state: action.payload}
    }

    case "SHOW_TRACKER_FAILED": {
      return {...state, error: action.payload}
    }

    case "RESET_SHOW_TRACKER": {
      return INIT_STATE;
    }
  }

  return state;
}