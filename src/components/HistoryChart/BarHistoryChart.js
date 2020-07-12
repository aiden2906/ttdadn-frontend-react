import React, {useEffect, useState} from 'react'
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  
// const data = [
//     {
//       name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//     },
//     {
//       name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//     },
//     {
//       name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//     },
//     {
//       name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//     },
//     {
//       name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//     },
//     {
//       name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//     },
//     {
//       name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//     },
//   ];

export default function BarHistoryChart({history}) {

    const [data, setData] = useState([]);
    let historyKey = [];
    let historyValue = [];
    useEffect(() => {
      if (Object.values(history).length > 0) {
        historyKey = [...Object.keys(history)];
        historyValue = [...Object.values(history)];
        //console.log(historyValue);
        let listData = [];
        let listHours = [];
        let averageHumi = [];
        let averageTemp = [];
        for (let i = 0; i < 100; i++) {
          let d = new Date(parseInt(historyKey[i]));
          //console.log(d.getHours());
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
  
        //   console.log(listHours)
        //console.log(averageHumi);
        //   console.log(averageHumi);
        averageHumi.forEach((element, index) => {
          let lengthofelementhumi = element.length;
          let lengthofelementtemp = averageTemp[index].length;
          let sumHumi = element.reduce((a, b) => a + b, 0);
          let sumTemp = averageTemp[index].reduce((a, b) => a + b, 0);
          //console.log(parseInt(sum/lengthofelement));
          //averageHumi[index] = 1;
          let modifiedData = {
            time: listHours[index].toString(),
            humi: parseInt(sumHumi / lengthofelementhumi).toString(),
            temp: parseInt(sumTemp / lengthofelementtemp).toString()
          };
          listData = [...listData, modifiedData]
        });
  
      //   for (let i = 0; i < 100; i += 9) {
      //     let d = new Date(parseInt(historyKey[i]));
      //     let modifiedData = {
      //       time: d.getMinutes() + ":" + d.getSeconds(),
      //       temp: historyValue[i].temp,
      //       humi: historyValue[i].humi,
      //       currentTime:
      //         d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
      //     };
      //     listData = [...listData, modifiedData];
      //     //console.log(listData);
      //   }
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
            top: 50, right: 40, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter = {formatter} />
          <YAxis />
          <Tooltip />   
          <Legend  />
          {/* <Bar dataKey="temp" fill="#8884d8" /> */}
          <Bar dataKey="humi" fill="#8884d8" />
        </BarChart>
      );
}
