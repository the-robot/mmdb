import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import About from './pages/About';
import AppLayout from './components/Layout';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import store from './store';

const App = () => (
  <Provider store={ store }>
    <BrowserRouter>
      <AppLayout>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route path='/calendar' component={ Calendar } />
          <Route path='/about' component={ About } />
        </Switch>
      </AppLayout>
    </BrowserRouter>
  </Provider>
);

const app = document.getElementById('app')

ReactDOM.render(<App />, app);