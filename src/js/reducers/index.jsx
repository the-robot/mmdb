import { combineReducers } from 'redux';

// Movies
import movie from './movies/movieReducer';
import movie_calendar from './movies/movieCalendarReducer';
import movies_in_theatre from './movies/inTheatreReducer';
import movies_toprated from './movies/topRatedReducer';

// TV Series
import series from './series/seriesReducer';
import series_calendar from './series/seriesCalendarReducer';

// Movie / TV Series Search
import show_search from './showSearchReducer';

import user from './userReducer';

export default combineReducers({
  movie,
  movie_calendar,
  movies_in_theatre,
  movies_toprated,
  series,
  series_calendar,
  show_search,
  user,
});
