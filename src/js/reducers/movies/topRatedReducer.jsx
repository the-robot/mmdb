//movies that will be in theatre

const INITIAL_STATE = {
  movies: [],
  page: 1,
  fetched_all: false,
  
  fetching: false,
  fetched: false,
  error: null,
}


export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case "FETCH_MOVIES_TOPRATED": {
      return {...state, fetching: true}
    }

    case "FETCH_MOVIES_TOPRATED_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }

    case "FETCH_MOVIES_TOPRATED_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        movies: state.movies.concat(action.payload),
        page: state.page + 1,
      }
    }

    case "FETCH_MOVIES_TOPRATED_ALL_FETCHED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        fetched_all: true,
      }
    }

    // RESET
    case "RESET_MOVIES_TOPRATED": {
      return INITIAL_STATE;
    }
  }

  return state;
}