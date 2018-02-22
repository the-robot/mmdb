export default function reducer(state={
  movies: [],
  year: new Date().getFullYear(),
  skip: 8, // year to be skip when load more
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case "FETCH_CALENDAR": {
      return {...state, fetching: true}
    }

    case "FETCH_CALENDAR_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }

    case "FETCH_CALENDAR_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        movies: sortMovies([...state.movies, action.payload]),
      }
    }
  }

  return state;
}

function sortMovies(movies) {
  // sort movies from current to the past
  return movies.sort((x, y) => {
    let current = parseInt(Object.keys(x)[0]); 
    let next = parseInt(Object.keys(y)[0]);
    
    return next > current ? 1
         : next < current ? -1
         : 0;
  });
}