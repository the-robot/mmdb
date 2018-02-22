const initialState = {
  movies: [],
  page: 1,  // page to be fetched in next call
  tofetch: 4,  // number of pages to be fetched
  fetching: false,
  fetched: false,
  error: null,
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case "FETCH_MOVIES": {
      return {...state, fetching: true}
    }

    case "FETCH_MOVIES_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }

    case "FETCH_MOVIES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        movies: state.movies.concat(action.payload),
      }
    }

    // update page number
    case "UPDATE_MOVIES_PAGE": {
      return {
        ...state,
        page: state.page + state.tofetch
      }
    }

    // reset all data
    case "RESET_MOVIES_DATA": {
      console.log('RESET CALLED');
      return initialState;
    }
  }

  return state;
}
