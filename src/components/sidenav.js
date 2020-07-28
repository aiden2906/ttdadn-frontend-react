import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import NotificationBadge, { Effect } from 'react-notification-badge';
import socketIOClient from 'socket.io-client';
import * as env from '../configs/environment';
const jwt = require('jsonwebtoken');
const axios = require('axios');

const SideNav = (props) => {
  const [count, setCount] = useState(0);
  const token = localStorage.getItem('token');
  const payload = jwt.verify(token, 'secretKey');
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
            <div class="sb-sidenav-menu-heading">Menu</div>
            <Link to="/chart" class="nav-link">
              <div class="sb-nav-link-icon">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;Charts
            </Link>
            <Link class="nav-link" to="controller">
              <div class="sb-nav-link-icon">
                <i class="fa fa-table"></i>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;Controller
            </Link>
            <Link class="nav-link" to="profile">
              <div class="sb-nav-link-icon">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;Profile
            </Link>
            <Link class="nav-link" to="notification">
              <div class="sb-nav-link-icon">
                <i style={{position:'relative'}} class="fa fa-bell" aria-hidden="true"><div style={{position:'absolute', top:'-10px', right:'-18px'}}><NotificationBadge count={count} effect={Effect.SCALE} /></div></i>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;Notification
            </Link>
            <Link class="nav-link" to="about">
              <div class="sb-nav-link-icon">
              <i class="fa fa-address-card"></i>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;About
            </Link>
            {payload?.username === 'admin@gmail.com' ? (
              <Link class="nav-link" to="admin">
                <div class="sb-nav-link-icon">
                  <i class="fa fa-user-secret" aria-hidden="true"></i>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;Admin
              </Link>
            ) : null}
          </div>
        </div>
        <div class="sb-sidenav-footer">
          <button type="submit" className="btn btn-danger" onClick={handleLogout}>
          <i class="fa fa-times-circle"></i> Log out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
