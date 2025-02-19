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

const VisitorsChart = ({ data }) => {
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
