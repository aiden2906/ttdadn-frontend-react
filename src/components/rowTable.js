import React, { useState, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableHead, TableRow, TableCell, TableBody, Table, IconButton, Collapse, Box } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CustomizedSwitch from '../components/customerSwitch';
import CustomizedSlider from '../components/customerSlider';
import * as env from '../configs/environment';
import '../css/controller.css';
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
  console.log('row render', roomId);
  useLayoutEffect(() => {
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
  }, []);

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
        <TableCell align="center">10</TableCell>
        <TableCell align="center">10</TableCell>
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
                            <CustomizedSwitch status={device.status} device={device.id} />
                          </TableCell>
                          <TableCell align="center">
                            <CustomizedSlider level={device.level} device={device.id} />
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
