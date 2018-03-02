import { combineReducers } from 'redux';

import calendar from './calendarReducer';
import movie from './movieReducer';
import movies from './moviesReducer';
import user from './userReducer';

export default combineReducers({
  calendar,
  movie,
  movies,
  user,
});
