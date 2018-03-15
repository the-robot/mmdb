import { combineReducers } from 'redux';

import intheatres from './inTheatresReducer';
import movie from './movieReducer';
import movie_calendar from './movieCalendarReducer';
import series from './seriesReducer';
import series_calendar from './seriesCalendarReducer';
import show_search from './showSearchReducer';
import user from './userReducer';

export default combineReducers({
  intheatres,
  movie,
  movie_calendar,
  series,
  series_calendar,
  show_search,
  user,
});
