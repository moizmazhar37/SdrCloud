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
  // Check if data is empty and create default data with all months
  const data =
    creditsData && creditsData.length > 0
      ? creditsData
      : [
          { month: "Jan", usage: 0 },
          { month: "Feb", usage: 0 },
          { month: "Mar", usage: 0 },
          { month: "Apr", usage: 0 },
          { month: "May", usage: 0 },
          { month: "Jun", usage: 0 },
          { month: "Jul", usage: 0 },
          { month: "Aug", usage: 0 },
          { month: "Sep", usage: 0 },
          { month: "Oct", usage: 0 },
          { month: "Nov", usage: 0 },
          { month: "Dec", usage: 0 },
        ];

  const chartRef = useRef(null);

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>Usage/Credits</h3>
      <div className={styles.chartContent}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: data.length > 5 ? 60 : 30,
            }}
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
              interval={0}
              angle={data.length > 5 ? -45 : 0}
              textAnchor={data.length > 5 ? "end" : "middle"}
              height={data.length > 5 ? 60 : 30}
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
