// store tv show information in details

const initialState = {
  general: {
    id: null,
    title: '',
    release_date: '',
    language: '',
    runtime: '',       // series duration
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
    case "FETCH_SERIES": {
      return {...state, fetching: true}
    }

    case "FETCH_SERIES_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }

    case "FETCH_SERIES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        general: action.payload,
      }
    }

    case "FETCH_SERIES_TRAILER_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        trailerId: action.payload,
      }
    }

    case "FETCH_SERIES_CAST_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        cast: action.payload,
      }
    }

    // reset all data
    case "RESET_SERIES_DATA": {
      return initialState;
    }
  }

  return state;
}
