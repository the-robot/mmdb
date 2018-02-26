// store movie information in details

const initialState = {
  general: {
    id: null,
    title: '',
    release_date: '',
    status: '',        // whether movie released or not
    language: '',
    runtime: '',       // movie duration
    pg: '',            // parental guide
    homepage: '',
    summary: '',
    rating: 0,
    genres: [],
    poster: '',
  },

  trailerId: '',
  cast: [],

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
        general: action.payload,
      }
    }

    case "FETCH_MOVIE_TRAILER_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        trailerId: action.payload,
      }
    }

    case "FETCH_MOVIE_CAST_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        cast: action.payload,
      }
    }

    // reset all data
    case "RESET_MOVIE_DATA": {
      return initialState;
    }
  }

  return state;
}
