//movies that are in theatre

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
    case "FETCH_INTHEATRES": {
      return {...state, fetching: true}
    }

    case "FETCH_INTHEATRES_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }

    case "FETCH_INTHEATRES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        movies: state.movies.concat(action.payload),
        page: state.page + 1,
      }
    }

    case "FETCH_INTHEATRES_ALL_FETCHED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        fetched_all: true,
      }
    }

    // RESET
    case "RESET_INTHEATRES": {
      return INITIAL_STATE;
    }
  }

  return state;
}