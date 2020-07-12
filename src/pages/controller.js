import React, { useState, useEffect } from 'react';
import { TableHead, TableRow, TableCell, TableBody, Table, Slider, TableContainer, Paper } from '@material-ui/core';
import * as env from '../configs/environment';
import socketIOClient from 'socket.io-client';
import { Row } from '../components/rowTable';
import '../css/controller.css';
const axios = require('axios');

export default function Controller() {
  const [rooms, setRooms] = useState([]);
  const [value, setValue] = useState({
    small: 0,
    medium: 0,
    large: 0,
  });
  console.log(value);
  const [count, setCount] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(env.ENDPOINT);
    socket.on('changeRoom', (data) => {
      setRooms(data);
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomname = e.target.roomname.value;
    const ids = count.map((x, idx) => {
      return e.target[`device${idx}`].value;
    });
    axios
      .post(
        `${env.ENDPOINT}/api.room`,
        {
          name: roomname,
          devices: ids,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => res.data)
      .then((data) => setRooms(rooms.concat([data])))
      .catch((err) => console.log(err));
  };

  const handleChangeSetting = (e) => {
    e.preventDefault();
    axios
      .put(
        `${env.ENDPOINT}/api.control/setting`,
        {
          small: e.target.small.value,
          medium: e.target.medium.value,
          large: e.target.large.value,
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
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Room </TableCell>
              <TableCell align="center">Temperature ( {'\u00b0'} C )</TableCell>
              <TableCell align="center">Humidity ( % )</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms
              ? rooms.map((room) => {
                  console.log('room:', room.id);
                  return <Row roomId={room.id}></Row>;
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <button type="button" class="btn btn-secondary mt-3" id="button-setting" data-toggle="modal" data-target="#exampleModalLong">
        <i class="fa fa-cog"></i>
      </button>
      <button type="button" class="btn btn-secondary mt-3" id="button-add" data-toggle="modal" data-target="#addModal">
        <i class="fa fa-plus-square"></i>
      </button>
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
                  {count
                    ? count.map((x, idx) => {
                        return <input class="form-control mt-1" type="text" name={`device${idx}`} />;
                      })
                    : null}
                </div>
                <button type="button" class="btn btn-secondary mt-3" id="button-add-device" onClick={() => setCount(count.concat([1]))}>
                  <i class="fa fa-plus-square"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-secondary mt-3 ml-1"
                  id="button-minus-device"
                  onClick={() => {
                    if (count.length < 1) {
                      return;
                    }
                    const newCount = [...count];
                    newCount.pop();
                    setCount(newCount);
                  }}
                >
                  <i class="fa fa-minus-square"></i>
                </button>
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
                Đèn sáng 33%:
                <Slider
                  value={value.small}
                  
                  step={1}
                  min={0}
                  valueLabelDisplay="auto"
                  max={100}
                  name="small"
                  onChange={(e, newValue) => handleChangeValue(e, newValue, 'small')}
                />
                Đèn sáng 66%:
                <Slider
                  value={value.medium}
                  step={1}
                  min={0}
                  valueLabelDisplay="auto"
                  max={100}
                  name="medium"
                  onChange={(e, newValue) => handleChangeValue(e, newValue, 'medium')}
                />
                Đèn sáng 99%:
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
