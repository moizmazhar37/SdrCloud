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
    if (!data || data.length === 0) return { min: 0, max: 5 };

    let min = 0; // We'll keep min at 0 for this chart type
    let max = 0;

    data.forEach((item) => {
      const values = [
        item.campaigns,
        item.meetings_booked,
        item.meetings_attended,
        item.unattended_meetings,
      ];

      values.forEach((value) => {
        // Skip null/undefined values
        if (value === null || value === undefined) return;

        // Convert to number to ensure proper comparison
        const numValue = Number(value);
        if (!isNaN(numValue) && numValue > max) {
          max = numValue;
        }
      });
    });

    // Check if max is still 0 (all data points are 0)
    if (max === 0) {
      max = 5; // Default to 5 if all values are zero
    } else {
      // Add some padding to max for better visualization
      max = Math.ceil(max * 1.1);
    }

    return { min, max };
  };

  const { min, max } = getMinMaxValues();

  // Safe generate ticks based on min/max values
  const generateTicks = (min, max) => {
    // Safety check to prevent invalid arrays
    if (max <= min) {
      return [0, 1, 2, 3, 4, 5]; // Safe default
    }

    const range = max - min;
    // Limit number of ticks based on range
    const tickCount = Math.min(10, range);

    // Ensure step is at least 1
    const step = Math.max(1, Math.ceil(range / tickCount));
    const ticks = [];

    // Limit the number of iterations as a safety measure
    for (let i = min, count = 0; i <= max && count < 20; i += step, count++) {
      ticks.push(i);
    }

    return ticks;
  };

  // Check if data is all zeros
  const isAllZeros =
    data &&
    data.length > 0 &&
    data.every(
      (item) =>
        (item.campaigns === 0 || item.campaigns === null) &&
        (item.meetings_booked === 0 || item.meetings_booked === null) &&
        (item.meetings_attended === 0 || item.meetings_attended === null) &&
        (item.unattended_meetings === 0 || item.unattended_meetings === null)
    );

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
              name="Campaigns"
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
              name="Meetings Booked"
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
              name="Meetings Attended"
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
              name="Unattended Meetings"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActiveProspectsLifecycle;
