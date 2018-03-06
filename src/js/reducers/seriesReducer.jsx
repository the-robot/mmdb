// store tv show information in details

const initialState = {
  general: {
    id: null,
    title: '',
    first_air_date: '',
    last_air_date: '',
    runtime: '',       // series duration
    homepage: '',
    summary: '',
    rating: 0,
    genres: [],
    poster: '',
    number_of_seasons: 0,
    seasons_info: [],
  },

  trailerId: '',
  seasons: [],
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

    case "FETCH_SERIES_SEASON_INFO_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        seasons: sort([...state.seasons, action.payload]),
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

function sort(data) {
  // sort data from current to the past
  return data.sort((x, y) => {
    let current = parseInt(x['season_number']); 
    let next = parseInt(y['season_number']);
    
    return next < current ? 1
         : next > current ? -1
         : 0;
  });
}