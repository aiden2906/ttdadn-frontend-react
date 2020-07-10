import React, { useLayoutEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'react-notifications/lib/notifications.css';
import * as env from '../configs/environment';
import socketIOClient from 'socket.io-client';
import '../css/notification.css';
const axios = require('axios');

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  useLayoutEffect(() => {
    const socket = socketIOClient(env.ENDPOINT);
    socket.on('count_notifications', (data) => {
      setNotifications(data);
    });

    axios
      .get(`${env.ENDPOINT}/api.notification`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => res.data)
      .then((data) => setNotifications(data))
      .catch((err) => console.log(err));
  }, []);

  const handleSeen = (notification) => {
    axios.get(`${env.ENDPOINT}/api.notification/${notification.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  return (
    <div className="container-fluid mt-3">
      <div class="card-body" style={{ background: 'white' }}>
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Content</th>
                  <th>At</th>
                </tr>
              </thead>
              <tbody>
                {notifications
                  ? notifications.map((notification) => {
                      const time = new Date(notification.created_at);
                      return (
                        <tr className={notification.status === 'seen' ? 'seen' : 'new'} onClick={() => handleSeen(notification)}>
                          <td>{notification.device_id}</td>
                          <td>{notification.content}</td>
                          <td>{notification.created_at ? `${time.getHours()}:${time.getMinutes()} ${time.toLocaleDateString()}` : ''}</td>
                        </tr>
                      );
                    }).reverse()
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Notification;
