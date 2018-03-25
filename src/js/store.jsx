import { applyMiddleware, createStore, compose } from "redux"
import { autoRehydrate } from "redux-persist"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import rootReducer from './reducers'

const middleware = applyMiddleware(promise(), thunk, logger());
let store = createStore(
  rootReducer,
  undefined,
  compose(middleware, autoRehydrate()),
);

export default store;