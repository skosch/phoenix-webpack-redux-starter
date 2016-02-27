import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import App from './containers/App';
import Dashboard from './components/Dashboard';
import Help from './components/Help';


const store = configureStore();

if (process.env.NODE_ENV === "production") {
  render(
    <div>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/app" component={App}>
            <IndexRoute component={Dashboard}/>
            <Route path="help" component={Help}/>
          </Route>
        </Router>
      </Provider>
    </div>,
    document.getElementById('root')
  );
} else {
  const DevTools = require('./components/DevTools');
  render(
    <div>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/app" component={App}>
            <IndexRoute component={Dashboard}/>
            <Route path="help" component={Help}/>
          </Route>
        </Router>
      </Provider>
      <DevTools store={store} />
    </div>,
    document.getElementById('root')
  );
}
