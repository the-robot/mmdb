export default function reducer(state={
  movies: [],
  year: new Date().getFullYear(),
  skip: 6, // year to be skip when load more
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
      var movies;

      // Prevent duplicated movie years
      if (!isExist(state.movies, Object.keys(action.payload)[0])) {
        movies = [...state.movies, action.payload]
      } else {
        movies = [...state.movies];
      }

      return {
        ...state,
        fetching: false,
        fetched: true,
        movies: movies,
      }
    }
  }

  return state
}

function isExist(array, item) {
  for (let i=0; i<array.length; i++) {
    if (Object.keys(array[i])[0] === item) {
      return true;
    }
  }

  return false;
}