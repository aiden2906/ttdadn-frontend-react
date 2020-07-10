import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import NotificationBadge, { Effect } from 'react-notification-badge';
import socketIOClient from 'socket.io-client';
import * as env from '../configs/environment';
const axios = require('axios');

const SideNav = (props) => {
  const [count, setCount] = useState(0);
  useLayoutEffect(() => {
    const socket = socketIOClient(env.ENDPOINT);
    socket.on('count_notifications', (data) => {
      setCount(data.filter((item) => item.status === 'new').length);
    });
    axios
      .get(`${env.ENDPOINT}/api.notification`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => res.data.filter((item) => item.status === 'new'))
      .then((data) => setCount(data.length))
      .catch((err) => console.log(err));
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    props.history.push('/login');
  }

  return (
    <div id="layoutSidenav_nav">
      <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
          <div class="nav">
            <div class="sb-sidenav-menu-heading">Addons</div>
            <Link to="/chart" class="nav-link">
              <div class="sb-nav-link-icon">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
              </div>
              Charts
            </Link>
            <Link class="nav-link" to="controller">
              <div class="sb-nav-link-icon">
                <i class="fa fa-table"></i>
              </div>
              Controller
            </Link>
            <div class="sb-sidenav-menu-heading">User area</div>
            <Link class="nav-link" to="profile">
              <div class="sb-nav-link-icon">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
              Profile
            </Link>
            <Link class="nav-link" to="notification">
              <div class="sb-nav-link-icon">
                <i class="fa fa-bell" aria-hidden="true"></i>
              </div>
              Notification <NotificationBadge count={count} effect={Effect.SCALE} />
            </Link>
            <Link class="nav-link" to="admin">
              <div class="sb-nav-link-icon">
                <i class="fa fa-user-secret" aria-hidden="true"></i>
              </div>
              Admin
            </Link>
          </div>
        </div>
        <div class="sb-sidenav-footer">
          <div class="small">Logged in as:</div>
          Start Bootstrap
          <br />
          <button type="submit" className="btn btn-primary" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
