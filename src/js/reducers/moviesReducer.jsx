export default function reducer(state={
  movies: [],
  page: 1,  // page to be fetched in next call
  fetching: false,
  fetched: false,
  error: null,
}, action) {

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
        movies: [...state.movies, action.payload],
      }
    }

    // update page number
    case "UPDATE_MOVIES_PAGE": {
      return {
        ...state,
        page: state.page + action.payload
      }
    }
  }

  return state;
}
