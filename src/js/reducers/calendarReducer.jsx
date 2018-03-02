const FUTURE = 1;

// store information of featured movie from different years
const INITIAL_STATE = {
  movies: [],
  year: new Date().getFullYear() + FUTURE,
  series: [],
  skip: 8, // year to be skip when load more
  fetching: false,
  fetched: false,
  error: null,
}

export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case "FETCH_CALENDAR": {
      return {...state, fetching: true}
    }

    case "FETCH_CALENDAR_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }

    case "FETCH_CALENDAR_MOVIES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        movies: sort([...state.movies, action.payload]),
      }
    }

    case "FETCH_CALENDAR_SERIES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        series: sort([...state.series, action.payload]),
      }
    }

    // reset all data
    case "RESET_CALENDAR_DATA": {
      return INITIAL_STATE;
    }
  }

  return state;
}

function sort(data) {
  // sort data from current to the past
  return data.sort((x, y) => {
    let current = parseInt(Object.keys(x)[0]); 
    let next = parseInt(Object.keys(y)[0]);
    
    return next > current ? 1
         : next < current ? -1
         : 0;
  });
}