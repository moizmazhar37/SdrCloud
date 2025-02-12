import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styles from "./VisitorsChart.module.scss";

const VisitorsChart = () => {
  // Hardcoded data for now - will be replaced with hook data later
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
    <div className={styles.container}>
      <h2 className={styles.title}>Visitors Identified</h2>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dx={-10}
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
            />
            <Bar
              dataKey="visitors"
              fill="#00B5FF"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VisitorsChart;
