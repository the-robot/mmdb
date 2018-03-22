import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

// Layouts
import MainLayout from './components/MainLayout';
import NoSideBarLayout from './components/NoSideBarLayout';

import About from './pages/About';
import Home from './pages/Home';

// Movie          : Movie description in details
// InTheatres     : Movies that are showing in theatres
// MovieCalender  : Show featured movies from different years
import Movie from './pages/Movies/Movie';
import InTheatre from './pages/Movies/InTheatre';
import MovieCalendar from './pages/Movies/MovieCalendar';
import TopRated from './pages/Movies/TopRated';

// Season            : TV Show season in details
// Series             : TV Show description in details
// TVSeriesCalendar  : Show featured tv series from different years
import Season from './pages/Series/Season';
import Series from './pages/Series/Series';
import SeriesCalendar from './pages/Series/SeriesCalendar';

import NotFound from './pages/NotFound';
import store from './store';

// Multiple Layouts
const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)

const App = () => (
  <Provider store={ store }>
    <Router>
      <Switch>
        <AppRoute exact path="/" layout={ MainLayout } component={ Home } />

        {/* Movies */}
        <AppRoute exact path="/movies/intheatres" layout={ MainLayout } component={ InTheatre } />
        <AppRoute path="/movies/toprated" layout={ MainLayout } component={ TopRated } />
        <AppRoute path="/movies/calendar/:id(\d+)" layout={ MainLayout } component={ Movie } />
        <AppRoute exact path="/movies/calendar" layout={ MainLayout } component={ MovieCalendar } />

        {/* TV Series */}
        <AppRoute exact path="/series/calendar/:id(\d+)/:season(\d+)" layout={ MainLayout } component={ Season } />
        <AppRoute exact path="/series/calendar/:id(\d+)" layout={ MainLayout } component={ Series } />
        <AppRoute exact path="/series/calendar" layout={ MainLayout } component={ SeriesCalendar } />


        <AppRoute exact path="/about" layout={ MainLayout } component={ About } />
        <AppRoute exact path="*" layout={ NoSideBarLayout } component={ NotFound } />
      </Switch>
    </Router>
  </Provider>
);

const app = document.getElementById('app');

ReactDOM.render(<App />, app);