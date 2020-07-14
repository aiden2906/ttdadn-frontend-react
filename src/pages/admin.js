import React, { useLayoutEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import * as env from '../configs/environment';
import socketIOClient from 'socket.io-client';
const jwt = require('jsonwebtoken');
const axios = require('axios');

const Admin = () => {
  const [key, setKey] = useState('user');
  const token = localStorage.getItem('token');
  const payload = jwt.verify(token, 'secretKey');
  if (payload.username === 'admin@gmail.com') {
    return (
      <div className="container-fluid mt-3">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => {
            setKey(k);
          }}
        >
          <Tab eventKey="user" title="User">
            <TableUser />
          </Tab>
          <Tab eventKey="humi" title="Humi">
            <TableHumi />
          </Tab>
          <Tab eventKey="lightd" title="LightD">
            <TableLightD />
          </Tab>
        </Tabs>
      </div>
    );
  }
  return <h3>You don't have Admin role</h3>;
};

const TableUser = React.memo(() => {
  console.log('user render');
  const [users, setUsers] = useState([]);
  useLayoutEffect(() => {
    axios
      .get(`${env.ENDPOINT}/api.user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => res.data)
      .then((data) => setUsers(data.filter((item) => item.username !== 'admin')))
      .catch((err) => console.log(err));
  }, []);

  const handleActive = (user) => {
    axios
      .put(
        `${env.ENDPOINT}/api.user/${user.id}/${user.is_active ? 'disable' : 'active'}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div class="card-body" style={{ background: 'white' }}>
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" style={{ height: '50%' }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
                <th>Active</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Total</th>
                <th colSpan="6">{users?.length || 0}</th>
              </tr>
            </tfoot>
            <tbody>
              {users
                ? users.map((user) => {
                    return <Row user={user} />;
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

const Row = ({ user: us }) => {
  console.log('row render');
  const [user, setUser] = useState(us);
  const handleActive = (user) => {
    axios
      .put(
        `${env.ENDPOINT}/api.user/${user.id}/${user.is_active ? 'disable' : 'active'}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        setUser({ ...user, is_active: !user.is_active });
      })
      .catch((err) => console.log(err));
  };
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.fullname}</td>
      <td>{user.email}</td>
      <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : ''}</td>
      <td>{user.updated_at ? new Date(user.updated_at).toLocaleDateString() : ''}</td>
      <td>
        <button type="button" class={user.is_active ? 'btn btn-danger' : 'btn btn-success'} onClick={() => handleActive(user)}>
          {user.is_active ? 'Disable' : 'Active'}
        </button>
      </td>
    </tr>
  );
};

const TableHumi = React.memo(() => {
  const [humis, setHumis] = useState([]);
  useLayoutEffect(() => {
    const socket = socketIOClient(env.ENDPOINT);
    socket.on('sensorChange', (data) => {
      console.log(data);
      setHumis(data);
    });
    axios
      .get(`${env.ENDPOINT}/api.sensor`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => res.data)
      .then((data) => setHumis(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddSensor = (e) => {
    e.preventDefault();
    axios
      .post(
        `${env.ENDPOINT}/api.sensor`,
        { id: e.target.sensorId.value, temp: 0, humi: 0 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div class="card-body" style={{ background: 'white' }}>
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Id</th>
                <th>Humidity</th>
                <th>Temperature</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Total</th>
                <th colSpan="2">{humis?.length || 0}</th>
              </tr>
            </tfoot>
            <tbody>
              {humis
                ? humis.map((humi) => {
                    return (
                      <tr>
                        <td>{humi.id}</td>
                        <td>{humi.humi}</td>
                        <td>{humi.temp}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <button type="button" class="btn btn-secondary mt-3" id="button-add-sensor" data-toggle="modal" data-target="#addSensor">
        <i class="fa fa-plus-square"></i> Add Sensor
      </button>
      <form class="form" onSubmit={handleAddSensor}>
        <div class="modal fade" id="addSensor" tabindex="-1" role="dialog" aria-labelledby="addSendsor">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addSendsor">
                  Add Sensor
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                SensorId <input class="form-control" type="text" name="sensorId" />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});

const TableLightD = React.memo(() => {
  const [lightDs, setLightDs] = useState([]);
  useLayoutEffect(() => {
    const socket = socketIOClient(env.ENDPOINT);
    socket.on('controlChange', (data) => {
      setLightDs(data);
    });
    axios
      .get(`${env.ENDPOINT}/api.control`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => res.data)
      .then((data) => setLightDs(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddControl = (e) => {
    e.preventDefault();
    axios
      .post(
        `${env.ENDPOINT}/api.control`,
        { id: e.target.controlId.value, status: 0, level: 0 },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div class="card-body" style={{ background: 'white' }}>
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Id</th>
                <th>Status</th>
                <th>Level</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Total</th>
                <th colSpan="2">{lightDs?.length || 0}</th>
              </tr>
            </tfoot>
            <tbody>
              {lightDs
                ? lightDs.map((lightD) => {
                    return (
                      <tr>
                        <td>{lightD.id}</td>
                        <td>{lightD.status}</td>
                        <td>{lightD.level}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <button type="button" class="btn btn-secondary mt-3" id="button-add-Control" data-toggle="modal" data-target="#addControl">
        <i class="fa fa-plus-square"></i> Add Control
      </button>
      <form class="form" onSubmit={handleAddControl}>
        <div class="modal fade" id="addControl" tabindex="-1" role="dialog" aria-labelledby="addControl">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addControl">
                  Add Control
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ControlId <input class="form-control" type="text" name="controlId" />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});

export default Admin;
