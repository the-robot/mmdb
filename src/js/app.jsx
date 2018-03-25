import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

// Redux Persist and store
import { persistStore, LocalForageStorage } from 'redux-persist';
import store from './store';

// Layouts
import MainLayout from './components/Layout/MainLayout';
import EmptyLayout from './components/Layout/EmptyLayout';

import About from './pages/About';
import Home from './pages/Home';

// Movie          : Movie description in details
// InTheatres     : Movies that are showing in theatres
// MovieCalender  : Show featured movies from differ ent years
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

import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Multiple Layouts
const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)

class App extends React.Component {
  state = {
    isReady: false,
  }

  componentDidMount() {
    persistStore(store, {
        storage: LocalForageStorage,
        whitelist: ['auth'],
      },
      () => {
        this.setState({ isReady: true });
      }
    )
  }

  render() {
    if ( this.state.isReady ) {
      //console.log("READY");
    }

    return (
      <Provider store={ store }>
        <Router>
          <Switch>
            <AppRoute exact path="/" layout={ MainLayout } component={ Home } />

            {/* Movies */}
            <AppRoute path="/movies/intheatres" layout={ MainLayout } component={ InTheatre } />
            <AppRoute path="/movies/toprated" layout={ MainLayout } component={ TopRated } />
            <AppRoute path="/movies/calendar/:id(\d+)" layout={ MainLayout } component={ Movie } />
            <AppRoute path="/movies/calendar" layout={ MainLayout } component={ MovieCalendar } />

            {
              /* TV Series */}
            <AppRoute path="/series/calendar/:id(\d+)/:season(\d+)" layout={ MainLayout } component={ Season } />
            <AppRoute path="/series/calendar/:id(\d+)" layout={ MainLayout } component={ Series } />
            <AppRoute path="/series/calendar" layout={ MainLayout } component={ SeriesCalendar } />

            <AppRoute path="/about" layout={ MainLayout } component={ About } />
            
            <AppRoute path="/register" layout={ EmptyLayout } component={ Register } />
            <AppRoute path="*" layout={ EmptyLayout } component={ NotFound } />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app);