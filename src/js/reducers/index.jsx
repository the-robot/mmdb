import { combineReducers } from 'redux';

import user from './userReducer';
import movies from './calendarReducer';

export default combineReducers({
  user,
  movies,
});
