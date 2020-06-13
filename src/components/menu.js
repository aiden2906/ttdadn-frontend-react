import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import TopNav from './topnav';
import SideNav from './sidenav';
import Footer from './footer';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleClickLogout = this.handleClickLogout.bind(this);
  }

  handleClickLogout(e) {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <TopNav />
        <div id="layoutSidenav">
          <Route component={SideNav}></Route>
          <div id="layoutSidenav_content">
            {this.props.children}
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
