import React, { useMemo, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AdminContext } from "../../contexts/AdminContext";

function MonthlyAvgRevenueChart() {
  const { journeys } = useContext(AdminContext);
  const data = useMemo(() => {
    const map = {};

    journeys.forEach((j) => {
      if (!j.date) return;

      const dateObj = new Date(j.date);
      if (isNaN(dateObj)) return;

      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const key = `${year}-${month}`;

      if (!map[key]) {
        map[key] = {
          totalRevenue: 0,
          totalTrips: 0,
        };
      }

      map[key].totalRevenue += j.weight || 0;
      map[key].totalTrips += 1;
    });

    return Object.keys(map)
      .sort()
      .map((key) => ({
        month: key,
        avgWeight:
          map[key].totalTrips === 0
            ? 0
            : (map[key].totalRevenue / map[key].totalTrips).toFixed(2),
      }));
  }, [journeys]);

  return (
    <div className="card p-3 mb-4">
      <h5>Average Weight (Monthly)</h5>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `Kgs ${value}`} />
          <Line
            type="monotone"
            dataKey="avgWeight"
            stroke="#7c3aed"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyAvgRevenueChart;
