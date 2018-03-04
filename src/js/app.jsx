import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import About from './pages/About';
import AppLayout from './components/Layout';
import Home from './pages/Home';

// Movie          : Movie description in details
// Movies         : Show movie cards
// MovieCalender  : Show featured movies from different years
import Movie from './pages/Movie/Movie';
import Movies from './pages/Movies';
import MovieCalendar from './pages/MovieCalendar';

// Seris             : TV Show description in details
// TVSeries          : Show tv series card
// TVSeriesCalendar  : Show featured tv series from different years
import Series from './pages/Series/Series';
import TVShows from './pages/TVShows';
import TVShowCalendar from './pages/TVShowCalendar';

import NotFound from './pages/NotFound';
import store from './store';

const App = () => (
  <Provider store={ store }>
    <BrowserRouter>
      <AppLayout>
        <Switch>
          <Route exact path='/' component={ Home } />

          {/* Movies */}
          <Route path='/calendar/movies/:year(\d+)/:id(\d+)' component={ Movie }/>
          <Route path='/calendar/movies/:year(\d+)' component={ Movies }/>
          <Route path='/calendar/movies' component={ MovieCalendar } />

          {/* TV Series */}
          <Route path='/calendar/series/:year(\d+)/:id(\d+)' component={ Series }/>
          <Route path='/calendar/series/:year(\d+)' component={ TVShows }/>
          <Route path='/calendar/series' component={ TVShowCalendar } />

          <Route path='/about' component={ About } />
          <Route path="*" component={ NotFound }/>
        </Switch>
      </AppLayout>
    </BrowserRouter>
  </Provider>
);

const app = document.getElementById('app');

ReactDOM.render(<App />, app);