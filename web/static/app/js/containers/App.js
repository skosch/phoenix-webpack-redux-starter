import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';

require("../../css/main.less");

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}


// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
