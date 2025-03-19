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
import FiltersDropdown from "src/Common/FiltersDropdown/FiltersDropdown";
import styles from "./VisitorsGraph.module.scss";

const VisitorsGraph = ({ setIsViewed }) => {
  // Sample data that matches the graph in the image
  const data = [
    { name: "Jan", visitors: 1500 },
    { name: "Feb", visitors: 4700 },
    { name: "Mar", visitors: 500 },
    { name: "Apr", visitors: 1950 },
    { name: "May", visitors: 800 },
    { name: "Jun", visitors: 1200 },
    { name: "Jul", visitors: 5000 },
  ];

  // Options for the filter dropdown
  const timeframeOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last-7-days", label: "Last 7 days" },
    { value: "last-30-days", label: "Last 30 days" },
    { value: "this-month", label: "This month" },
    { value: "last-month", label: "Last month" },
    { value: "custom", label: "Custom" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          <p className={styles.tooltipItem} style={{ color: "#0D3B66" }}>
            Visitors: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.graphCard}>
      <div className={styles.header}>
        <h2 className={styles.title}>Visitors Graph</h2>
        <FiltersDropdown
          options={timeframeOptions}
          className={styles.dropdown}
          setIsViewed={setIsViewed}
        />
      </div>
      <div className={styles.graphContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 14 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 14 }}
              dx={-10}
              tickFormatter={(value) =>
                value === 0 ? "0" : value.toLocaleString()
              }
              // Allow the chart to automatically calculate appropriate ticks
              // based on the data range
              allowDataOverflow={false}
              allowDecimals={false}
              domain={["dataMin", "dataMax"]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              name="Visitors"
              stroke="#0D3B66"
              fill="#D1E3F8"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VisitorsGraph;
