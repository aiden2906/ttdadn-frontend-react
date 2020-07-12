import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Row, Col, Nav, Form, Button } from "react-bootstrap";

import ChartContainer from "../components/ChartContainer/ChartContainer";
import HistoryChart from "../components/HistoryChart/HistoryChart";
import OtherHistoryChart from "../components/HistoryChart/OtherHistoryChart"
import BarHistoryChart from "../components/HistoryChart/BarHistoryChart";
import "../css/Chart.css";

const axios = require("axios");
const ENDPOINT = "http://127.0.0.1:4000";

export default function Chart() {
  const [history, setHistory] = useState([]);
  const [sensor, setSensor] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    axios
      .get(`http://localhost:4000/api.sensor`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("get data");
        console.log(res);
        let { data } = res;
        let history = data[0].history;
        let historyKey = [];
        let historyValue = [];
        if (history) {
          historyKey = [...Object.keys(history)];
          historyValue = [...Object.values(history)];
          let listData = [];
          for (let i = 0; i < 100; i += 9) {
            let d = new Date(parseInt(historyKey[i]));
            let modifiedData = {
              time: d.getHours() +":"+d.getMinutes() + ":" + d.getSeconds(),
              temp: historyValue[i].temp,
              humi: historyValue[i].humi,
              currentTime:
                d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
            };
            listData = [...listData, modifiedData];
            setSensor((currentHumidity) => [...currentHumidity, modifiedData]);
            setData({
              humi: modifiedData.humi,
              temp: modifiedData.temp,
              currentTime: modifiedData.currentTime,
            });
            setHistory(currentHistory => data[0].history);
          }
        }
      });

    socket.on("sensorChange", (data) => {
      let dataSensor = data[0];
      let d = new Date();
      let modifiedData = {
        history: data[0].history,
        temp: dataSensor.temp,
        humi: dataSensor.humi,
        name: dataSensor.id,
        time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        currentTime: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
      };
      setSensor((currentHumidity) => [...currentHumidity, modifiedData]);
      setData({
        humi: modifiedData.humi,
        temp: modifiedData.temp,
        currentTime: modifiedData.currentTime,
      });
      setHistory((currentHistory) => data[0].history);
    });

  
  }, []);
  return (
    <div className="wrapper">
      <Row>
        <Col sm={12} className="">
          <div className="chart-container">
            <div className="hour_chart_temp">
              <BarHistoryChart className="line-chart" history={history}/>
            </div>
            <div className="hour_chart_humi">
              <OtherHistoryChart className="line-chart" history={history}/>
            </div>
            <div className="humidity_chart">
              <ChartContainer className="line-chart" data={sensor} />
            </div>


            <div className="form-info">
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Humidity: </Form.Label>
                  <Form.Text style={{ color: "#231bbb" }} className="form-text">
                    {data.humi ? `${data.humi}%` : null}
                  </Form.Text>
                  <br />
                  <Form.Label>Temp: </Form.Label>
                  <Form.Text style={{ color: "#c40202" }} className="form-text">
                    {data.temp ? `${data.temp} Celius` : null}
                  </Form.Text>
                  <br />
                  {
                    //TODO: format time 00:00:00
                  }
                  <Form.Label>Time: </Form.Label>
                  <Form.Text className="form-text">
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
