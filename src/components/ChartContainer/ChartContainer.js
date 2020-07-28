import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  linearGradient,
  Area,
} from "recharts";
export default function ChartContainer({ data, select}) {
  let getdata = data;
  const [state, setState] = useState(window.innerWidth < 1200 ? 500 : 1020);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1200) {
        setState(500);
      } else {
        setState(1020);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 1200) {
          setState(500);
        } else {
          setState(1020);
        }
      });
    };
  });
  return (
    <AreaChart
      width={state}
      height={300}
      data={getdata}
      margin={{ top: 30, right: 40, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#231bbb" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#231bbb" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#c40202" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#c40202" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="time" />
      <YAxis />
      <CartesianGrid strokeDasharray="10 10" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="humi"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
      <Area type="linear" dataKey="temp" stroke="#c40202" fillOpacity={0} />
    </AreaChart>
  );
}

{
  /* <Form>
        <Form.Group>
          <Form.Label>In time: </Form.Label>
          <Form.Control as="select" className="my-1 mr-sm-2" custom>
            <option value="1">1 hour</option>
            <option value="2">2 hours</option>
          </Form.Control>
        </Form.Group>
      </Form> */
}
