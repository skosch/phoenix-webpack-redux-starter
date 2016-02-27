import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from '../components/Header';

require("../../css/main.less");

class App extends Component {
  componentDidMount() {

  }

  render() {

    return (
      <div>
        <Header />

        {this.props.children}

      </div>
    );
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
