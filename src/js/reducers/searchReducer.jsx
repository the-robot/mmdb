export default function reducer(state={
  results: [],
  
  // States
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case "SEARCH_SHOWS": {
      return {...state, fetching: true}
    }

    case "SEARCH_SHOWS_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }

    case "SEARCH_SHOWS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        results: action.payload,
      }
    }

    case "SEARCH_SHOWS_CLEAR": {
      return {
        ...state,
        results: [],
      }
    }
  }

  return state;
}