const INITIAL_STATE = {
  page: 1,
  data: [],
  tracker_count: {},      // store how many data are in each tracker

  fetched_complete: false,
  error: null,
}

export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case "PROFILE_LIBRARY_REJECTED": {
      return {...state, error: action.payload}
    }

    case "PROFILE_LIBRARY_FULFILLED": {
      var data = state.data.concat(action.payload);
      // sort in show title alphabatically from a-z
      data.sort((x, y) => (x.title < y.title ? -1 : 1))

      return {
        ...state,
        data: data,
        page: state.page + 1,
      }
    }

    case "PROFILE_LIBRARY_TRACKER_COUNT": {
      return {
        ...state,
        tracker_count: action.payload,
      }
    }

    // fetched all data
    case "PROFILE_LIBRARY_DONE": {
      return {
        ...state,
        fetched_complete: true,
      }
    }

    case "RESET_PROFILE_LIBRARY_DATA": {
      return {
        ...state,
        data: [],
      }
    }

    case "RESET_PROFILE_LIBRARY": {
      return INITIAL_STATE;
    }
  }

  return state;
}
