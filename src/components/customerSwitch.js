import React from 'react';
import Switch from '@material-ui/core/Switch';
import * as env from '../configs/environment';

const axios = require('axios');

export default function CustomizedSwitch({ device, status: statusDevice }) {
  const [status, setStatus] = React.useState(statusDevice);

  const handleChangeSwitch = (event) => {
    const status = event.target.checked;
    axios.put(
      `${env.ENDPOINT}/api.control/${device}`,
      {
        status: `${status ? '1' : '0'}`,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    setStatus(event.target.checked);
  };

  return <Switch checked={status} onChange={handleChangeSwitch} name="setStatus" color="primary" />;
}
