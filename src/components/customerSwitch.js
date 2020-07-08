import React from "react";
import Switch from "@material-ui/core/Switch";

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
    <Switch checked={status} onChange={handleChangeSwitch} name="setStatus" color="primary"/>
  );
}

