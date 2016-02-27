import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistory, routeReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';
import combinedReducers from '../reducers';

const loggerMiddleware = createLogger();

const reduxRouterMiddleware = syncHistory(browserHistory);

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    reduxRouterMiddleware
  )
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(
    combineReducers(Object.assign({}, combinedReducers, {routing: routeReducer})),
    initialState
  );

  reduxRouterMiddleware.listenForReplays(store);

  return store;
}
