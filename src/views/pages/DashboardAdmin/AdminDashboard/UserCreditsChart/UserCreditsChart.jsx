import React, { useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styles from "./UserCreditsChart.module.scss";

const UserCreditsChart = ({ creditsData }) => {
  // If no data is provided, use sample data
  const data = creditsData;

  const chartRef = useRef(null);

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>Usage/Credits</h3>
      <div className={styles.chartContent}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barGap={0}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="#E0E0E0"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
              tickCount={5}
              domain={[0, "auto"]}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              contentStyle={{
                borderRadius: "4px",
                border: "1px solid #E0E0E0",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                padding: "8px 12px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            {/* <Bar
              dataKey="credits"
              name="Credits"
              fill="#00A3FF"
              radius={[2, 2, 0, 0]}
              maxBarSize={40}
            /> */}
            <Bar
              dataKey="usage"
              name="Usage"
              fill="#003366"
              radius={[3, 3, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserCreditsChart;
