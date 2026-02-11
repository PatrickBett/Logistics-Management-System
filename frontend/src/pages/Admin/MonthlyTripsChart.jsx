import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MonthlyTripsChart({ journeys }) {
  const monthlyData = useMemo(() => {
    const map = {};

    journeys.forEach((j) => {
      const month = new Date(j.date).toLocaleString("default", {
        month: "short",
      });
      console.log("jdate",j.date)


      if (!map[month]) map[month] = 0;
      map[month]++;
    });

    return Object.keys(map).map((month) => ({
      month,
      trips: map[month],
    }));
  }, [journeys]);
  console.log("mdata",monthlyData);

  return (
    <div className="card p-3 mb-4">
      <h5>Monthly Trips Trend</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="trips" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyTripsChart;
