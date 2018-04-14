import { combineReducers } from 'redux';

// Authentications
import auth from './authentication/authReducer';
import register from './authentication/registerReducer';

// Profile
import profile from './profile/profileReducer';
import library from './profile/libraryReducer';

// Movies
import movie from './movies/movieReducer';
import movie_calendar from './movies/movieCalendarReducer';
import movies_in_theatre from './movies/inTheatreReducer';
import movies_toprated from './movies/topRatedReducer';

// TV Series
import series from './series/seriesReducer';
import series_calendar from './series/seriesCalendarReducer';
import series_airing_today from './series/seriesAiringTodayReducer';
import series_ontv from './series/seriesOnTvReducer';

// Movie / TV Series Search
import show_search from './searchReducer';

// Movie / TV Series Tracker
import show_track from './trackerReducer';

export default combineReducers({
  auth,
  register,
  
  profile,
  library,

  movie,
  movie_calendar,
  movies_in_theatre,
  movies_toprated,

  series,
  series_calendar,
  series_airing_today,
  series_ontv,

  show_search,
  show_track,
});
