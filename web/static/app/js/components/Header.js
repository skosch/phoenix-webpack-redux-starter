import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div className ="ui inverted menu" style={{borderRadius: '0', backgroundColor: "#118441"}}>
        <Link className="item" to="/app">
          Dashboard
        </Link>

        <div className="right menu">
          <Link className="item" to="/app/help">
            Help
          </Link>
          <Link className="item" to="/app/logout">
            Logout
          </Link>
        </div>
      </div>
    );
  }
}
