import { combineReducers } from 'redux';

import in_theatre from './inTheatreReducer';
import movie from './movieReducer';
import movie_calendar from './movieCalendarReducer';
import series from './seriesReducer';
import series_calendar from './seriesCalendarReducer';
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
