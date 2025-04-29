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
  // Calculate min and max values from data for dynamic y-axis
  const getMinMaxValues = () => {
    if (!data || data.length === 0) return { min: -100, max: 100 };

    let min = 0;
    let max = 0;

    data.forEach((item) => {
      const values = [
        item.campaigns,
        item.meetings_booked,
        item.meetings_attended,
        item.unattended_meetings,
      ];

      values.forEach((value) => {
        if (value < min) min = value;
        if (value > max) max = value;
      });
    });

    // Add some padding to min/max for better visualization
    min = Math.floor(min * 1.1);
    max = Math.ceil(max * 1.1);

    return { min, max };
  };

  const { min, max } = getMinMaxValues();

  // Generate ticks based on min/max values
  const generateTicks = (min, max) => {
    const range = max - min;
    const tickCount = 10; // Approximate number of ticks
    const step = Math.ceil(range / tickCount);
    const ticks = [];

    for (let i = min; i <= max; i += step) {
      ticks.push(i);
    }

    return ticks;
  };

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
              domain={[min, max]}
              ticks={generateTicks(min, max)}
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
              dataKey="campaigns"
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
              dataKey="meetings_booked"
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
              dataKey="meetings_attended"
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
            <Area
              type="monotone"
              dataKey="unattended_meetings"
              stroke="#9333EA" // Purple
              fill="rgba(147, 51, 234, 0.15)"
              fillOpacity={1}
              strokeWidth={2}
              dot={{
                stroke: "#9333EA",
                fill: "#9333EA",
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
