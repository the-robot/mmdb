// store information of featured movie from different years

export default function reducer(state={
  movies: [],
  series: [],
  year: new Date().getFullYear() + 1,  // get movies a year ahead
  skip: 8, // year to be skip when load more
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case "FETCH_CALENDAR": {
      return {...state, fetching: true}
    }

    case "FETCH_CALENDAR_MOVIES_REJECTED": {
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