import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";

import rootReducer from "../reducers";
import sagas from "../sagas";

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();

// add the middlewares
let middlewares = [
  sagaMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

// create the store
const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
);

sagaMiddleware.run(sagas);

// export
export default store;
