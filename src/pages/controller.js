import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CustomizedRadios from "./radio";
const axios = require("axios");

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(room, temperature, humidity, devices) {
  return {
    room,
    temperature,
    humidity,
    devices,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="center">
          {row.room}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.temperature}</TableCell>
        <TableCell align="center">{row.humidity}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                List Of Devices
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Device</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.devices.map((devicesRow) => (
                    <TableRow key={devicesRow.device}>
                      <TableCell align="center">{devicesRow.device}</TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <CustomizedRadios status={devicesRow.status} device={devicesRow.device}/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    room: PropTypes.number.isRequired,
    temperature: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    devices: PropTypes.arrayOf(
      PropTypes.shape({
        device: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData("H6-123", 30, 75, [
    { device: "Điều Hoà 1", status: 0 },
    { device: "Điều hoà 2", status: 2 },
  ]),
  // createData("H2-102", 31, 60, [
  //   { device: "Điều Hoà 1", status: 3 },
  //   { device: "Điều Hoà 2", status: 2 },
  //   { device: "Điều Hoà 3", status: 0 },
  // ]),
  // createData("H1-201", 29, 85, [
  //   { device: "Điều Hoà 1", status: 0 },
  //   { device: "Điều Hoà 2", status: 0 },
  // ]),
  // createData("H2-202", 30.5, 75, [
  //   { device: "Điều Hoà 1", status: 2 },
  //   { device: "Điều Hoà 2", status: 2 },
  // ]),
  // createData("H2-113", 31, 67, [
  //   { device: "Điều Hoà 1", status: 1 },
  //   { device: "Điều Hoà 2", status: 0 },
  //   { device: "Điều Hoà 3", status:  1 },
  //   { device: "Điều Hoà 4", status: 3 },
  // ]),
];

export default function Controller() {
  const [control, setControl] = useState({
    status: 0,
    level: 0,
  });
  const [sensor, setSensor] = useState({
    temp: 0,
    humi: 0,
  });

  console.log(control);
  console.log(sensor);

  useEffect(() => {
    axios
      .get("http://localhost:4000/control")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        const [device] = data;
        setControl({ status: device.status, level: device.level });
      });

    axios
      .get("http://localhost:4000/sensor")
      .then((res) => res.data)
      .then((data) => {
        const [device] = data;
        setSensor({ temp: device.temp, humi: device.humi });
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              style={{ display: "flex", justifyContent: "center" }}
            >
              Room{" "}
            </TableCell>
            <TableCell align="center">Temperature ( {"\u00b0"} C )</TableCell>
            <TableCell align="center">Humidity ( % )</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))} */}

          <Row
            row={createData("Room 1", sensor.temp, sensor.humi, [
              { device: "LightD", status: control.status },
            ])}

          ></Row>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
