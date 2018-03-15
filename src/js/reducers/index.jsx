import { combineReducers } from 'redux';

import in_theatre from './movies/inTheatreReducer';
import movie from './movies/movieReducer';
import movie_calendar from './movies/movieCalendarReducer';
import series from './series/seriesReducer';
import series_calendar from './series/seriesCalendarReducer';
import show_search from './showSearchReducer';
import user from './userReducer';

export default combineReducers({
  in_theatre,
  movie,
  movie_calendar,
  series,
  series_calendar,
  show_search,
  user,
});
