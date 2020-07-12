import React, { useState, useEffect } from "react";
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
import { ComposedChart, Bar } from "recharts";

export default function HistoryChart({ history }) {
  const [data, setData] = useState([]);
  let historyKey = [];
  let historyValue = [];
  useEffect(() => {
    if (Object.values(history).length>0) {
      historyKey = [...Object.keys(history)];
      historyValue = [...Object.values(history)];
      //console.log(Object.values(history).length);
      let listData = [];
      // historyKey.map((element, index) => {
      //   let d = new Date(parseInt(element));
      //   let modifiedData = {
      //     time: d.getMinutes() + ":" + d.getSeconds(),
      //     value: parseInt(historyValue[index] * 100),
      //   };
      //   listData = [...listData, modifiedData];

      //  setData(listData);
      //});

      for (let i = 0; i < 100; i += 9) {
        let d = new Date(parseInt(historyKey[i]));
        //console.log("someone here")
        //console.log(historyValue[i].temp);
        let modifiedData = {
          time: d.getMinutes() + ":" + d.getSeconds(),
          temp: historyValue[i].temp,
          humi: historyValue[i].humi,
          currentTime:
            d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        };
        listData = [...listData, modifiedData];
        console.log(listData);
      }
      setData(currenthistory => listData);
    }
  }, [history]);
  return (
    <div>
      <AreaChart
        width={530}
        height={300}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="humi" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="humi"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
}
