import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import About from './pages/About';
import AppLayout from './components/Layout';
import Home from './pages/Home';

// Movie          : Movie description in details
// InTheatres     : Movies that are showing in theatres
// MovieCalender  : Show featured movies from different years
import Movie from './pages/Movies/Movie';
import InTheatre from './pages/Movies/InTheatre';
import MovieCalendar from './pages/Movies/MovieCalendar';

// Season            : TV Show season in details
// Series             : TV Show description in details
// TVSeriesCalendar  : Show featured tv series from different years
import Season from './pages/Series/Season';
import Series from './pages/Series/Series';
import SeriesCalendar from './pages/Series/SeriesCalendar';

import NotFound from './pages/NotFound';
import store from './store';

const App = () => (
  <Provider store={ store }>
    <Router>
      <AppLayout>
        <Switch>
          <Route exact path='/' component={ Home } />

          {/* Movies */}
          <Route path='/movies/intheatres' component={InTheatre} />
          <Route path='/movies/calendar/:id(\d+)' component={ Movie } />
          <Route path='/movies/calendar' component={ MovieCalendar } />

          {/* TV Series */}
          <Route path='/series/calendar/:id(\d+)/:season(\d+)' component={ Season } />
          <Route path='/series/calendar/:id(\d+)' component={ Series } />
          <Route path='/series/calendar' component={ SeriesCalendar } />

          <Route path='/about' component={ About } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </AppLayout>
    </Router>
  </Provider>
);

const app = document.getElementById('app');

ReactDOM.render(<App />, app);