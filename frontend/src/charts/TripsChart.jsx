import React from "react";
import { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
import {
  Pie,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  ResponsiveContainer,
  PieChart,
  Legend,
} from "recharts";

function TripsChart() {
  const { drivers } = useContext(AdminContext);
  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={drivers}
            dataKey="complete_trips"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            label
          >
            <Tooltip />
            <Legend />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default TripsChart;
