import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, linearGradient, Area } from 'recharts';
export default function ChartContainer({data}) {
    return (
      <AreaChart width={530} height={290} data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#231bbb" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#231bbb" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#c40202" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#c40202" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="time" />
      <YAxis />
      <CartesianGrid strokeDasharray="10 10" />
      <Tooltip />
      <Area type="monotone" dataKey="humi" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      <Area type="linear" dataKey="temp" stroke="#c40202" fillOpacity={0} />
      </AreaChart>
    )
}
