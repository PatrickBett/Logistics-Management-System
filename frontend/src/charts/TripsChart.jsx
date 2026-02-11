import React, { useContext, useMemo } from "react";
import { AdminContext } from "../contexts/AdminContext";
import { Pie, PieChart, Tooltip, Legend, ResponsiveContainer } from "recharts";

function TripsChart() {
  const { drivers } = useContext(AdminContext);

  const top5Drivers = useMemo(() => {
    if (!drivers) return [];

    return [...drivers]
      .sort((a, b) => b.complete_trips - a.complete_trips)
      .slice(0, 5);
  }, [drivers]);

  if (top5Drivers.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <>
      <h6 className="text-center mb-2">Top 5 Drivers by Completed Trips</h6>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={top5Drivers}
            dataKey="complete_trips"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default TripsChart;
