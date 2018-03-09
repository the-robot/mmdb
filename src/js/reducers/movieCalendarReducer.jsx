const FUTURE = 1;

const INITIAL_STATE = {
  movies: [],
  
  year: new Date().getFullYear() + FUTURE,
  skip: 16, // year to be skip when load more
  fetch_pages: 4,  // number of pages to be fetched

  // States
  fetching: false,
  fetched: false,
  error: null,
}

export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case "FETCH_MOVIE_CALENDAR": {
      return {...state, fetching: true}
    }

    case "FETCH_MOVIE_CALENDAR_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }

    case "INIT_MOVIE_CALENDAR": {
      return {
        ...state,
        movies: sort([...state.movies, action.payload]),
      }
    }

    case "FETCH_MOVIE_CALENDAR_FULFILLED": {
      var movies = state.movies;

      // year of new data
      const year = Object.keys(action.payload)[0];

      // get index of given year
      // then add new data into given year
      const index = movies.findIndex(x => Object.keys(x)[0] === year);
      movies[index][year] = movies[index][year].concat(action.payload[year]);

      return {
        ...state,
        fetching: false,
        fetched: true,
        movies: [...movies],
      }
    }

    case "DELETE_MOVIE_CALENDAR_EXPECT_YEAR": {
      const year = action.payload;
      const movies = state.movies;

      for(let i=0; i<movies.length; i++) {
        const temp_year = parseInt(Object.keys(movies[i])[0]);

        if ( temp_year !== year )
          movies[i][temp_year] = [];
      }

      return {
        ...state,
        movies: movies,
      }
    }

    // RESET
    case "RESET_MOVIE_CALENDAR_DATA": {
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