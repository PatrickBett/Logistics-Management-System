import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

function StatusPieChart({ journeys }) {
  const COLORS = ["#16a34a", "#dc2626"]; // Green, Red

  const statusData = useMemo(() => {
    const completed = journeys.filter((j) => j.status === "delivered").length;

    const cancelled = journeys.filter((j) => j.status === "cancelled").length;

    return [
      { name: "Completed", value: completed },
      { name: "Cancelled", value: cancelled },
    ];
  }, [journeys]);

  return (
    <div className="card p-3 mb-4">
      <h5>Completed vs Cancelled Trips</h5>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusPieChart;
