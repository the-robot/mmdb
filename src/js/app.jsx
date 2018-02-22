import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import About from './pages/About';
import AppLayout from './components/Layout';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import NotFound from './pages/NotFound';
import store from './store';

const App = () => (
  <Provider store={ store }>
    <BrowserRouter>
      <AppLayout>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route path='/calendar/:year' component={ Movies }/>
          <Route path='/calendar' component={ Calendar } />
          <Route path='/about' component={ About } />
          <Route path="*" component={ NotFound }/>
        </Switch>
      </AppLayout>
    </BrowserRouter>
  </Provider>
);

const app = document.getElementById('app')

ReactDOM.render(<App />, app);