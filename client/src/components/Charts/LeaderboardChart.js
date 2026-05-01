import React from "react";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#00e5ff",
  "#00ff99",
  "#ff9800",
  "#ff5252",
  "#ab47bc"
];

function LeaderboardChart({ data }) {

  return (

    <ResponsiveContainer
      width="100%"
      height={350}
    >

      <PieChart>

        <Pie
          data={data}
          dataKey="count"
          nameKey="name"
          outerRadius={120}
          label
        >

          {
            data.map((e, i) => (

              <Cell
                key={i}
                fill={
                  COLORS[
                    i % COLORS.length
                  ]
                }
              />
            ))
          }

        </Pie>

        <Tooltip />

      </PieChart>

    </ResponsiveContainer>
  );
}

export default LeaderboardChart;