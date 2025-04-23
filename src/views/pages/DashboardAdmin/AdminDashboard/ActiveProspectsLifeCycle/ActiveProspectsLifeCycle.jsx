import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./ActiveProspectsLifeCycle.module.scss";

const ActiveProspectsLifecycle = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.secondaryText}>Active Prospects Life Cycle</div>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 30, bottom: 50 }}
            baseValue="dataMin"
          >
            <CartesianGrid
              horizontal={true}
              vertical={true}
              stroke="#e0e0e0"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={10}
              angle={-45}
              textAnchor="end"
              height={70}
              style={{ fontSize: "12px", fill: "#666" }}
            />
            <YAxis
              domain={[-100, 100]}
              ticks={[-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]}
              tickLine={true}
              axisLine={true}
              tickMargin={10}
              style={{ fontSize: "12px", fill: "#666" }}
            />
            <Tooltip
              labelStyle={{ color: "black" }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />

            {/* Each area component with updated colors */}
            <Area
              type="monotone"
              dataKey="product1"
              stroke="#4CAF50" // Green
              fill="rgba(76, 175, 80, 0.15)"
              fillOpacity={1}
              strokeWidth={2}
              dot={{
                stroke: "#4CAF50",
                fill: "#4CAF50",
                r: 4,
              }}
            />
            <Area
              type="monotone"
              dataKey="product2"
              stroke="#1D4ED8" // Blue
              fill="rgba(29, 78, 216, 0.15)"
              fillOpacity={1}
              strokeWidth={2}
              dot={{
                stroke: "#1D4ED8",
                fill: "#1D4ED8",
                r: 4,
              }}
            />
            <Area
              type="monotone"
              dataKey="product3"
              stroke="#F97316" // Orange
              fill="rgba(249, 115, 22, 0.15)"
              fillOpacity={1}
              strokeWidth={2}
              dot={{
                stroke: "#F97316",
                fill: "#F97316",
                r: 4,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActiveProspectsLifecycle;
