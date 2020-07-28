import React, { useEffect, useState, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Row, Col, Nav, Form, Button } from 'react-bootstrap';
import ChartContainer from '../components/ChartContainer/ChartContainer';
import HistoryChart from '../components/HistoryChart/HistoryChart';
import OtherHistoryChart from '../components/HistoryChart/OtherHistoryChart';
import BarHistoryChart from '../components/HistoryChart/BarHistoryChart';
import * as env from '../configs/environment';
import '../css/Chart.css';
const axios = require('axios');

export default function Chart() {
  const [select, setSelect] = useState(1);
  const [history, setHistory] = useState([]);
  const [sensor, setSensor] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`${env.ENDPOINT}/api.sensor`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log('get data');
        console.log(res);
        let { data } = res;
        let history = data[0].history;
        let historyKey = [];
        let historyValue = [];
        if (history) {
          historyKey = [...Object.keys(history)];
          historyValue = [...Object.values(history)];
          let listData = [];
          let currentTime;
          let currentTimeNumber;
          let modifiedData;
          for (let i = 0; i < historyKey.length; i++) {
            let d = new Date(parseInt(historyKey[i]));
            currentTime = new Date();
            currentTimeNumber = parseInt(currentTime.getTime());
            modifiedData = {
              time: d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
              temp: historyValue[i].temp,
              humi: historyValue[i].humi,
              currentTime: (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + d.getMinutes() + ':' + d.getSeconds(),
            };
            if (currentTimeNumber - parseInt(historyKey[i]) <= select * 1000 * 60 * 60) {
              listData = [...listData, modifiedData];
            }
          }
          setData({
            humi: modifiedData.humi,
            temp: modifiedData.temp,
            currentTime: modifiedData.currentTime,
          });

          setHistory(data[0].history);
          let listFilterData = [];
          for (let i = 0; i < listData.length; i += parseInt(listData.length / 10)) {
            listFilterData = [...listFilterData, listData[i]];
          }

          setSensor((currentHumidity) => []);
          setSensor((currentHumidity) => [...currentHumidity, ...listFilterData]);
        }
      });
  }, [select]);

  useEffect(() => {
    const socket = socketIOClient(env.ENDPOINT);
    socket.on('sensorChange', (data) => {
      let dataSensor = data[0];
      let d = new Date();
      let modifiedData = {
        temp: dataSensor.temp,
        humi: dataSensor.humi,
        name: dataSensor.id,
        time: d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
        currentTime: (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + d.getMinutes() + ':' + d.getSeconds(),
      };
      setSensor((currentHumidity) => [...currentHumidity, modifiedData]);
      setData({
        humi: modifiedData.humi,
        temp: modifiedData.temp,
        currentTime: modifiedData.currentTime,
      });
      setHistory(data[0].history);
    });
  }, []);

  const handleOnchange = (e) => {
    setSelect(parseInt(e.target.value));
  };

  return (
    <div className="wrapper">
      <Row>
        <Col sm={12} className="">
          <div className="chart-container">
            <div className="hour_chart_temp">
              <BarHistoryChart className="line-chart" history={history} />
            </div>
            <div className="hour_chart_humi">
              <OtherHistoryChart className="line-chart" history={history} />
            </div>
            <div className="humidity_chart">
              <ChartContainer className="line-chart" data={sensor} select={select} />
              <br />
            </div>

            <div className="form-radio">
              <Form onChange={handleOnchange}>
                <Form.Group>
                  <Form.Label>Type Time: </Form.Label>
                  <Form.Check type="radio" id={`default-radio1`} label="a hour ago" value="1" name="radio" defaultChecked ></Form.Check>
                  <Form.Check type="radio" id={`default-radio2`} label="3 hour ago" value="3" name="radio"></Form.Check>
                  <Form.Check type="radio" id={`default-radio3`} label="6 hour ago" value="6" name="radio"></Form.Check>
                  <Form.Check type="radio" id={`default-radio4`} label="a day ago" value="24" name="radio"></Form.Check>
                </Form.Group>
              </Form>
            </div>

            <div className="form-info">
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Humidity: </Form.Label>
                  <Form.Text style={{ color: '#231bbb' }} className="form-text">
                    {data.humi ? `${data.humi}%` : null}
                  </Form.Text>
                  <br />
                  <Form.Label>Temp: </Form.Label>
                  <Form.Text style={{ color: '#c40202' }} className="form-text">
                    {data.temp ? `${data.temp} Celius` : null}
                  </Form.Text>
                  <br />
                  {
                    //TODO: format time 00:00:00
                  }
                  <Form.Label>Time: </Form.Label>
                  <Form.Text className="form-text">{data.currentTime}</Form.Text>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
