import { applyMiddleware, createStore, compose } from 'redux';
//import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducers from './reducers'

/*
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(promise(), thunk);//, logger());
const persistConfig = {
    key: 'root',
    storage: storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = compose(persistReducer, {}, composeEnhancers(middleware));
*/

const middleware = applyMiddleware(promise(), thunk);
let store = createStore(
    reducers,
    undefined,
    compose(middleware),
);

export default store;