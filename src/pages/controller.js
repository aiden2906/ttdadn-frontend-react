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
import CustomizedSwitch from "../components/customerSwitch";
import CustomizedSlider from "../components/customerSlider";
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
              <Table
                size="small"
                aria-label="collapsible table"
                style={{ background: "#E2E4E6", borderRadius: "5px" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{width:'30%'}}>Device</TableCell>
                    <TableCell align="center" style={{width:'33%'}}>Status</TableCell>
                    <TableCell align="center" style={{width:'33%'}}>Level</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.devices.map((devicesRow) => (
                    <TableRow key={devicesRow.device}>
                      <TableCell align="center">{devicesRow.device}</TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <CustomizedSwitch
                          status={devicesRow.status}
                          device={devicesRow.device}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <CustomizedSlider
                          level={devicesRow.level}
                          device={devicesRow.device}
                        />
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

export default function Controller() {
  const [control, setControl] = useState({
    status: 0,
    level: 0,
  });
  const [sensor, setSensor] = useState({
    temp: 0,
    humi: 0,
  });
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
    <div className="container-fluid mt-3">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Room </TableCell>
              <TableCell align="center">Temperature ( {"\u00b0"} C )</TableCell>
              <TableCell align="center">Humidity ( % )</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Row
              row={createData("Room 1", sensor.temp, sensor.humi, [
                {
                  device: "LightD",
                  status: control.status,
                  level: control.level,
                },
              ])}
            ></Row>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
