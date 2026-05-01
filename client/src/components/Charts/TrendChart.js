import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function TrendChart({ data }) {

  return (

    <ResponsiveContainer
      width="100%"
      height={350}
    >

      <LineChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="count"
          stroke="#00ff99"
          strokeWidth={4}
        />

      </LineChart>

    </ResponsiveContainer>
  );
}

export default TrendChart;