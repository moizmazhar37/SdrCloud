import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"; // Ensure recharts is installed and the version supports these components
import styles from "./VisitorsChart.module.scss"; // Ensure this file exists and is valid

const VisitorsChart = () => {
  const data = [
    { date: "11/6", visitors: 3 },
    { date: "11/7", visitors: 3 },
    { date: "11/8", visitors: 4 },
    { date: "11/9", visitors: 3 },
    { date: "11/10", visitors: 3 },
    { date: "11/11", visitors: 5 },
    { date: "11/12", visitors: 4 },
  ];

  return (
    <div className={styles?.chartContainer || ""}>
      <h3 className={styles?.title || ""}>Visitors Identified</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={30}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: "#666" }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="visitors" fill="#0096FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorsChart;
