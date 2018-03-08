// store movie information in details

const initialState = {
  overview: {
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

  trailer: '',      // Youtube ID
  cast: [],
  reviews: {
    results: [],
    next: 1,        // page num to fetch when tried to get reviews
  },

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

    // Fetching Success States
    case "FETCH_MOVIE_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        overview: action.payload,
      }
    }

    case "FETCH_MOVIE_TRAILER_FULFILLED": {
      return {
        ...state,
        trailer: action.payload,
      }
    }

    case "FETCH_MOVIE_CAST_FULFILLED": {
      return {
        ...state,
        cast: action.payload,
      }
    }

    case "FETCH_MOVIE_REVIEWS_FULFILLED": {
      return {
        ...state,
        reviews: {
          results: state.reviews.results.concat(action.payload),
          next: state.reviews.next + 1,
        }
      }
    }

    // reset all data
    case "RESET_MOVIE_DATA": {
      return initialState;
    }
  }

  return state;
}
