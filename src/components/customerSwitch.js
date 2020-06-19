import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";

const axios = require("axios");

export default function CustomizedSwitch({ device, status: statusDevice }) {
  const [status, setStatus] = React.useState(statusDevice);

  const handleChangeSwitch = (event) => {
    const status = event.target.checked;
    axios.put(`http://localhost:4000/control/${device}`, {
      status: `${status ? "1" : "0"}`,
    });
    setStatus(event.target.checked);
  };

  return (
    <Switch checked={status} onChange={handleChangeSwitch} name="setStatus" />
  );
}

