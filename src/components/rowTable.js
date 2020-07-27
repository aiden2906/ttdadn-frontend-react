import React, { useState, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableHead, TableRow, TableCell, TableBody, Table, IconButton, Collapse, Box } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CustomizedSwitch from '../components/customerSwitch';
import CustomizedSlider from '../components/customerSlider';
import * as env from '../configs/environment';
import socketIOClient from 'socket.io-client';
import '../css/controller.css';
const _ = require('lodash');
const axios = require('axios');

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
export const Row = (props) => {
  const { roomId } = props;
  const [room, setRoom] = useState({});
  const [devices, setDevices] = useState([]);
  useLayoutEffect(() => {
    const socket = socketIOClient(env.ENDPOINT);
    socket.on('changeRoom', (data) => {
      const myroom = data.find((item) => item.id === roomId);
      setRoom(myroom);
    });
    socket.on('controlChange', (data) => {
      const free_device = data.filter((item) => item.status_device === 'free').map((item) => item.id);
      setDevices(free_device);
      axios
      .get(`${env.ENDPOINT}/api.room/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        console.log('fetch data', data);
        setRoom(data);
      })
      .catch((err) => console.log(err));
    });
    axios
      .get(`${env.ENDPOINT}/api.room/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        console.log('fetch data', data);
        setRoom(data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${env.ENDPOINT}/api.room/${roomId}/all-visible-device`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        const device_id = data.map((item) => item.id);
        setDevices(device_id);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeSwitch = (device_id, value) => {
    const new_devices = room.devices.map((device) => {
      if (device.id === device_id) {
        device.status = value ? '1' : '0';
      }
      return device;
    });
    room.devices = new_devices;
    setRoom(room);
  };

  const handleChangeSlider = (device_id, value) => {
    const new_devices = room.devices.map((device) => {
      if (device.id === device_id) {
        device.level = value;
      }
      return device;
    });
    room.devices = new_devices;
    setRoom(room);
  };

  const handleOnchangeCheckbox = (device) => {
    axios
      .put(`${env.ENDPOINT}/api.room/${room.id}`, { device_id: device }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => {
        axios
          .get(`${env.ENDPOINT}/api.room/${roomId}/all-visible-device`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => res.data)
          .then((data) => {
            const device_id = data.map((item) => item.id);
            setDevices(device_id);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="center">
          {room.name}
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{room.createdBy}</TableCell>
        <TableCell align="center">{room.createdAt ? new Date(room.createdAt).toLocaleDateString() : ''}</TableCell>
        <TableCell align="center">{room.updatedAt ? new Date(room.updatedAt).toLocaleDateString() : ''}</TableCell>
        <TableCell align="center">
          <button type="button" class="btn btn-secondary mt-3" id="button-add-device" data-toggle="modal" data-target={`#changeRoom${room.name}`}>
            <i class="fa fa-retweet"></i>
          </button>
          <form class="form">
            <div class="modal fade" id={`changeRoom${room.name}`} tabindex="-1" role="dialog" aria-labelledby="changeRoomLabel">
              <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="changeRoomLabel">
                      Change Device In Room
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    {devices || room.devices
                      ? _.unionBy(devices || [], room.controlDeviceIds || []).map((device) => {
                          return (
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id={device}
                                checked={room.controlDeviceIds ? (room.controlDeviceIds.includes(device) ? true : false) : false}
                                onClick={() => handleOnchangeCheckbox(device)}
                              />
                              <label class="form-check-label" for={`defaultCheck${device}`}>
                                {device}
                              </label>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="collapsible table" style={{ background: '#E2E4E6', borderRadius: '5px' }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ width: '30%' }}>
                      Device
                    </TableCell>
                    <TableCell align="center" style={{ width: '33%' }}>
                      Status
                    </TableCell>
                    <TableCell align="center" style={{ width: '33%' }}>
                      Level
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {room.devices
                    ? room.devices.map((device) => (
                        <TableRow key={device.device}>
                          <TableCell align="center">{device.id}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <CustomizedSwitch status={device.status} device={device.id} handleChangeSwitch={handleChangeSwitch} />
                          </TableCell>
                          <TableCell align="center">
                            <CustomizedSlider level={device.level} device={device.id} handleChangeSlider={handleChangeSlider} />
                          </TableCell>
                        </TableRow>
                      ))
                    : 'No Device'}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
