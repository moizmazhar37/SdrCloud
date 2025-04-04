import React from "react";
import {
  LineChart,
  Line,
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
        <div className={styles.primaryText}>5.987,37</div>
        <div className={styles.secondaryText}>Secondary text</div>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 30, bottom: 50 }}
          >
            <CartesianGrid
              horizontal={true}
              vertical={true}
              stroke="#e0e0e0"
              strokeDasharray="3 3"
              fillOpacity={0.1}
              fill="url(#colorGrid)"
            />
            <defs>
              <linearGradient id="colorGrid" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f0f0f0" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#f0f0f0" stopOpacity={0.1} />
              </linearGradient>
            </defs>

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
            <Line
              type="monotone"
              dataKey="product1"
              stroke="#0000FF"
              strokeWidth={2}
              dot={{
                stroke: "#0000FF",
                fill: "#0000FF",
                r: 4,
              }}
            />
            <Line
              type="monotone"
              dataKey="product2"
              stroke="#800080"
              strokeWidth={2}
              dot={{
                stroke: "#800080",
                fill: "#800080",
                r: 4,
              }}
            />
            <Line
              type="monotone"
              dataKey="product3"
              stroke="#FF69B4"
              strokeWidth={2}
              dot={{
                stroke: "#FF69B4",
                fill: "#FF69B4",
                r: 4,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActiveProspectsLifecycle;
