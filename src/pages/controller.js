import React, { useState, useEffect } from 'react';
import { TableHead, TableRow, TableCell, TableBody, Table, Slider, TableContainer, Paper } from '@material-ui/core';
import * as env from '../configs/environment';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from 'socket.io-client';
import { Row } from '../components/rowTable';
import '../css/controller.css';
const jwt = require('jsonwebtoken');
const axios = require('axios');

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
  },
});

export default function Controller() {
  const classes = useStyles();
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [value, setValue] = useState({
    small: 0,
    medium: 0,
    large: 0,
  });
  const token = localStorage.getItem('token');
  const payload = jwt.verify(token, 'secretKey');
  useEffect(() => {
    const socket = socketIOClient(env.ENDPOINT);
    socket.on('changeRoom', (data) => {
      console.log('changeRoom', data);
      setRooms(data);
    });

    socket.on('controlChange', (data) => {
      const free_data = data.filter((item) => item.status_device === 'free');
      setDevices(free_data);
    });
    axios
      .get(`${env.ENDPOINT}/api.room`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => res.data)
      .then((data) => setRooms(data))
      .catch((err) => console.log(err));

    axios
      .put(
        `${env.ENDPOINT}/api.control/setting`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => res.data)
      .then((data) => {
        console.log('data', data);
        setValue({
          small: parseInt(data[2]),
          medium: parseInt(data[1]),
          large: parseInt(data[0]),
        });
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `${env.ENDPOINT}/api.room/all-rest-device`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => res.data)
      .then((data) => {
        setDevices(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomname = e.target.roomname.value;
    const deviceIds = devices.filter((device) => e.target[device.id].checked).map((device) => device.id);
    axios
      .post(
        `${env.ENDPOINT}/api.room`,
        { name: roomname, devices: deviceIds },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .catch((err) => console.log(err));
    e.target.roomname.value = '';
  };

  const handleChangeSetting = (e) => {
    e.preventDefault();
    axios
      .put(
        `${env.ENDPOINT}/api.control/setting`,
        {
          setting: {
            small: e.target.small.value,
            medium: e.target.medium.value,
            large: e.target.large.value,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => res.data)
      .then((data) => setValue(data))
      .catch((err) => console.log(err));
  };

  const handleChangeValue = (e, newValue, name) => {
    const x = { ...value };
    x[name] = newValue;
    setValue(x);
  };

  return (
    <div className="container-fluid mt-3 controller-container">
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table aria-label="collapsible table sticky" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Room </TableCell>
                <TableCell align="center">Created By</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Updated By</TableCell>
                <TableCell align="center">Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms
                ? rooms.map((room) => {
                    return <Row roomId={room.id}></Row>;
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <button type="button" class="btn btn-secondary mt-3" id="button-setting" data-toggle="modal" data-target="#exampleModalLong">
        <i class="fa fa-cog"></i>
      </button>
      {payload.username === 'admin@gmail.com' ? (
        <button type="button" class="btn btn-secondary mt-3" id="button-add" data-toggle="modal" data-target="#addModal">
          <i class="fa fa-plus-square"></i> Add Room
        </button>
      ) : null}
      <form class="form" onSubmit={handleSubmit}>
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Add room
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>Roomname</label>
                  <input class="form-control" type="text" name="roomname" />
                  <label className="mt-3">DeviceID</label>
                  {devices?.map((device) => {
                    return (
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" id={device.id} />
                        <label class="form-check-label" for={device.id}>
                          {device.id}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={handleChangeSetting}>
        <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Setting
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Mức độ cảnh báo thường
                <Slider
                  value={value.small}
                  step={1}
                  min={0}
                  valueLabelDisplay="auto"
                  max={100}
                  name="small"
                  onChange={(e, newValue) => handleChangeValue(e, newValue, 'small')}
                />
                Mức độ cảnh báo chú ý
                <Slider
                  value={value.medium}
                  step={1}
                  min={0}
                  valueLabelDisplay="auto"
                  max={100}
                  name="medium"
                  onChange={(e, newValue) => handleChangeValue(e, newValue, 'medium')}
                />
                Mức độ cảnh báo nguy hiểm
                <Slider
                  value={value.large}
                  step={1}
                  min={0}
                  valueLabelDisplay="auto"
                  max={100}
                  name="large"
                  onChange={(e, newValue) => handleChangeValue(e, newValue, 'large')}
                />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
