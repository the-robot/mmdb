import { combineReducers } from 'redux';

import calendar from './calendarReducer';
import movie from './movieReducer';
import shows from './showsReducer';
import user from './userReducer';

export default combineReducers({
  calendar,
  movie,
  shows,
  user,
});
