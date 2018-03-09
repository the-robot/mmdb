const FUTURE = 1;

const INITIAL_STATE = {
  series: [],
  
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
    case "FETCH_SERIES_CALENDAR": {
      return {...state, fetching: true}
    }

    case "FETCH_SERIES_CALENDAR_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }

    case "INIT_SERIES_CALENDAR": {
      return {
        ...state,
        series: sort([...state.series, action.payload]),
      }
    }

    case "FETCH_SERIES_CALENDAR_FULFILLED": {
      var series = state.series;

      // year of new data
      const year = Object.keys(action.payload)[0];

      // get index of given year
      // then add new data into given year
      const index = series.findIndex(x => Object.keys(x)[0] === year);

      series[index][year] = series[index][year].concat(action.payload[year]);

      return {
        ...state,
        fetching: false,
        fetched: true,
        series: [...series],
      }
    }

    case "DELETE_SERIES_CALENDAR_EXPECT_YEAR": {
      const year = action.payload;
      const series = state.series;

      for(let i=0; i<series.length; i++) {
        const temp_year = parseInt(Object.keys(series[i])[0]);

        if ( temp_year !== year )
          series[i][temp_year] = [];
      }

      return {
        ...state,
        series: series,
      }
    }

    // RESET
    case "RESET_SERIES_CALENDAR_DATA": {
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