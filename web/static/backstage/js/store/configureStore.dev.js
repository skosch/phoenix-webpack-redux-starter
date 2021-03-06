import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistory, routeReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';
import combinedReducers from '../reducers';
import DevTools from '../components/DevTools';

const loggerMiddleware = createLogger();

const reduxRouterMiddleware = syncHistory(browserHistory);

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
    reduxRouterMiddleware
  ),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(
    combineReducers(Object.assign({}, combinedReducers, {routing: routeReducer})),
    initialState
  );

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(Object.assign({}, require('../reducers'), {routing: routeReducer}))
    );
  }

  reduxRouterMiddleware.listenForReplays(store);

  return store;
}
