// store movie information in details

const initialState = {
  id: null,
  title: '',
  year: null,
  release_date: '',
  language: '',
  summary: '',
  rating: null,
  poster: '',
  backcover: '',
  cast: {},
  trailers: [],

  // states
  fetching: false,
  fetched: false,
  error: null,
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case "FETCH_MOVIE": {
      return {...state, fetching: true}
    }

    case "FETCH_MOVIE_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }

    case "FETCH_MOVIE_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        movies: state.movies.concat(action.payload),
      }
    }

    // reset all data
    case "RESET_MOVIE_DATA": {
      return initialState;
    }
  }

  return state;
}
