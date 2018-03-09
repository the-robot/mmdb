import { combineReducers } from 'redux';

import movie_calendar from './movieCalendarReducer';
import movie from './movieReducer';
import series_calendar from './seriesCalendarReducer';
import series from './seriesReducer';
import user from './userReducer';

export default combineReducers({
  movie_calendar,
  movie,
  series_calendar,
  series,
  user,
});
