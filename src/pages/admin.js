import React, { useLayoutEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "react-notifications/lib/notifications.css";
const axios = require("axios");

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [humis, setHumis] = useState([]);
  const [lightDs, setLightDs] = useState([]);
  const [key, setKey] = useState("user");
  useLayoutEffect(() => {
    axios
      .get("http://localhost:4000/api.user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  const handleActive = (user) => {
    axios
      .put(
        `http://localhost:4000/api.user/${user.id}/${
          user.isActive ? "disable" : "active"
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((err) => console.log(err));
  };

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
          <TableUser users={users} handleActive={handleActive} />
        </Tab>
        <Tab eventKey="humi" title="Humi">
          <TableHumi humis={humis} />
        </Tab>
        <Tab eventKey="lightd" title="LightD">
          <TableLightD lightDs={lightDs} />
        </Tab>
      </Tabs>
    </div>
  );
};

const TableUser = ({ users, handleActive }) => {
  return (
    <div class="card-body" style={{ background: "white" }}>
      <div class="table-responsive">
        <table
          class="table table-bordered"
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
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
              <th>{users?.length || 0}</th>
            </tr>
          </tfoot>
          <tbody>
            {users
              ? users.map((user) => {
                  return (
                    <tr>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.fullname}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : ""}
                      </td>
                      <td>
                        {user.updatedAt
                          ? new Date(user.updatedAt).toLocaleDateString()
                          : ""}
                      </td>
                      <td>
                        <button
                          type="button"
                          class={
                            user.isActive ? "btn btn-danger" : "btn btn-success"
                          }
                          onClick={() => handleActive(user)}
                        >
                          {user.isActive ? "Disable" : "Active"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableHumi = ({ humis }) => {
  return (
    <div class="card-body" style={{ background: "white" }}>
      <div class="table-responsive">
        <table
          class="table table-bordered"
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
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
};

const TableLightD = ({ lightDs }) => {
  return (
    <div class="card-body" style={{ background: "white" }}>
      <div class="table-responsive">
        <table
          class="table table-bordered"
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
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
};

export default Admin;
