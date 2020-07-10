import React, { useLayoutEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import * as env from '../configs/environment';
const axios = require('axios');

const Admin = () => {
  const [key, setKey] = useState('user');

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
  console.log('humi render');

  const [humis, setHumis] = useState([]);
  useLayoutEffect(() => {
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

  return (
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
  );
});

const TableLightD = React.memo(() => {
  console.log('light render');

  const [lightDs, setLightDs] = useState([]);
  useLayoutEffect(() => {
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

  return (
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
  );
});

export default Admin;
