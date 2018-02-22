import { combineReducers } from 'redux';

import calendar from './calendarReducer';
import movies from './moviesReducer';
import user from './userReducer';

export default combineReducers({
  calendar,
  movies,
  user,
});
