const INITIAL_STATE = {
  page: 1,
  data: [],

  fetched_complete: false,
  error: null,
}

export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case "PROFILE_LIBRARY_REJECTED": {
      return {...state, error: action.payload}
    }

    case "PROFILE_LIBRARY_FULFILLED": {
      var data = state.data.concat(action.payload.data);
      // sort in show title alphabatically from a-z
      data.sort((x, y) => (x.title < y.title ? -1 : 1))

      return {
        ...state,
        data: data,
        page: state.page + 1,
      }
    }

    // fetched all data
    case "PROFILE_LIBRARY_DONE": {
      return {
        ...state,
        fetched_complete: true,
      }
    }

    case "RESET_PROFILE_LIBRARY": {
      return INITIAL_STATE;
    }
  }

  return state;
}
