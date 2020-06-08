import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Chart from './components/chart';
const ENDPOINT = 'http://127.0.0.1:4000';

const App = () => {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('sensorChange', (data) => {
      console.log(data);
    });
  }, []);
  return <Chart></Chart>;
};

export default App;
