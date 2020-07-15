import React, { PureComponent, Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const colors = scaleOrdinal(schemeCategory10).range();

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
  x + width / 2
}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
  y + height
} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default function OtherHistoryChart({ history }) {
  const [data, setData] = useState([]);
  let historyKey = [];
  let historyValue = [];
  useEffect(() => {
    if (Object.values(history).length > 0) {
      historyKey = [...Object.keys(history)];
      historyValue = [...Object.values(history)];
      let listData = [];
      let listHours = [];
      let averageHumi = [];
      let averageTemp = [];
      for (let i = 0; i < 100; i++) {
        let d = new Date(parseInt(historyKey[i]));
        if (listHours.length <= 0) {
          listHours.push(d.getHours());
          averageHumi.push([parseInt(historyValue[i].humi)]);
          averageTemp.push([parseInt(historyValue[i].temp)]);
        } else {
          if (d.getHours() != listHours[listHours.length - 1]) {
            listHours.push(d.getHours());
            averageHumi.push([parseInt(historyValue[i].humi)]);
            averageTemp.push([parseInt(historyValue[i].temp)]);
          } else {
            averageHumi[averageHumi.length - 1].push(
              parseInt(historyValue[i].humi)
            );
            averageTemp[averageTemp.length - 1].push(
              parseInt(historyValue[i].temp)
            );
          }
        }
      }

      averageHumi.forEach((element, index) => {
        let lengthofelementhumi = element.length;
        let lengthofelementtemp = averageTemp[index].length;
        let sumHumi = element.reduce((a, b) => a + b, 0);
        let sumTemp = averageTemp[index].reduce((a, b) => a + b, 0);
        let modifiedData = {
          time: listHours[index].toString(),
          humi: parseInt(sumHumi / lengthofelementhumi).toString(),
          temp: parseInt(sumTemp / lengthofelementtemp).toString(),
        };
        listData = [...listData, modifiedData];
      });
      setData((currenthistory) => listData);
    }
  }, [history]);
  const formatter = (value) => `${value}h`;
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 50,
        right: 40,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" tickFormatter={formatter} />
      <YAxis />
      <Bar
        dataKey="temp"
        fill="#c40202"
        shape={<TriangleBar />}
        label={{ position: "top" }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill="#c40202" />
        ))}
      </Bar>
      <Legend />
    </BarChart>
  );
}

