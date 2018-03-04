// store many movies information from given year

const initialState = {
  shows: [],
  page: 1,  // page to be fetched in next call
  tofetch: 4,  // number of pages to be fetched
  fetching: false,
  fetched: false,
  error: null,
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case "FETCH_SHOWS": {
      return {...state, fetching: true}
    }

    case "FETCH_SHOWS_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }

    case "FETCH_SHOWS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        shows: state.shows.concat(action.payload),
      }
    }

    // update page number
    case "UPDATE_SHOWS_PAGE": {
      return {
        ...state,
        page: state.page + state.tofetch
      }
    }

    // reset all data
    case "RESET_SHOWS_DATA": {
      return initialState;
    }
  }

  return state;
}
