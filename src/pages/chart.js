import React, {useEffect, useState} from 'react';
import socketIOClient from 'socket.io-client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, linearGradient, Area } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Row, Col, Nav, Form, Button} from "react-bootstrap";

import ChartContainer from "../components/ChartContainer/ChartContainer";
import HistoryChart from "../components/HistoryChart/HistoryChart";

import '../css/Chart.css';

const ENDPOINT = 'http://127.0.0.1:4000';

export default function Chart() {
  const [history, setHistory] = useState([]);
  const [sensor, setSensor] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('sensorChange', (data) => {
      console.log(data);
      let dataSensor = data[1];
      let d = new Date();
      let modifiedData =  {
        history : data[0].history,
        temp : dataSensor.temp,
        humi : dataSensor.humi,
        name : dataSensor.id,
        time: d.getMinutes() + ":" + d.getSeconds(),
        currentTime: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
      }
      setSensor(currentHumidity => [...currentHumidity, modifiedData]);
      setData({
        humi: modifiedData.humi, 
        temp: modifiedData.temp,
        currentTime : modifiedData.currentTime
      });
      setHistory(currentHistory => [modifiedData.history, modifiedData.history, modifiedData.history])
    });
  }, []);
  return (
    <div className="wrapper">
        <Row>
          <Col sm={12} className = "">
            <div className = "chart-container">
                <div className= "humidity_chart">
                  <ChartContainer className ="line-chart" data = {sensor}/>
                </div>
                <div className = "week_chart">
                  <HistoryChart className ="line-chart" history = {history[0]}/>
                </div>
                <div className = "form-info">
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Humidity: </Form.Label>
                      <Form.Text className="">
                        {data.humi}
                      </Form.Text>
                      <br />
                      <Form.Label>Temp: </Form.Label>
                      <Form.Text className="">
                        {data.temp}
                      </Form.Text>
                      <br />
                      <Form.Label>Time: </Form.Label>
                      <Form.Text className="">
                        {data.currentTime}
                      </Form.Text>
                    </Form.Group>
                  </Form>
                </div>
            </div>
          </Col>
        </Row>
    </div>
  );
}
