//series that are airing today

const INITIAL_STATE = {
  series: [],
  page: 1,
  fetched_all: false,
  
  fetching: false,
  fetched: false,
  error: null,
}


export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case "FETCH_SERIES_AIRING_TODAY": {
      return {...state, fetching: true}
    }

    case "FETCH_SERIES_AIRING_TODAY_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }

    case "FETCH_SERIES_AIRING_TODAY_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        series: state.series.concat(action.payload),
        page: state.page + 1,
      }
    }

    case "FETCH_SERIES_AIRING_TODAY_ALL_FETCHED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        fetched_all: true,
      }
    }

    // RESET
    case "RESET_SERIES_AIRING_TODAY": {
      return INITIAL_STATE;
    }
  }

  return state;
}