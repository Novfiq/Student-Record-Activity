import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function DepartmentChart({ data }) {

  return (

    <ResponsiveContainer
      width="100%"
      height={350}
    >

      <BarChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="department" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="count"
          fill="#00e5ff"
          radius={[10, 10, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>
  );
}

export default DepartmentChart;