import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TopDriversChart({ drivers }) {
  const top5Drivers = useMemo(() => {
    return [...drivers]
      .map((d) => ({
        name: d.name,
        trips: d.complete_trips,
      }))
      .sort((a, b) => b.trips - a.trips)
      .slice(0, 5);
  }, [drivers]);
  console.log(top5Drivers);

  return (
    <div className="card p-3 mb-4">
      <h5>Top 5 Drivers (Completed Trips)</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={top5Drivers}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `${value} Trips`} />
          <Bar dataKey="trips" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopDriversChart;
