import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Dropdown from "src/Common/Dropdown/Dropdown";
import FiltersDropdown from "src/Common/FiltersDropdown/FiltersDropdown";
import styles from "./Graph.module.scss";

const Graph = ({
  data,
  title,
  dropdownOptions,
  selectedOption,
  type,
  setIsViewed,
}) => {
  const renderDropdown = () => {
    // if (type === 'filters') {
    //   return (
    //     <FiltersDropdown
    //       options={dropdownOptions}
    //       className={styles.dropdown}
    //       setIsViewed={setIsViewed}
    //     />
    //   );
    // }
    // return (
    //   <Dropdown
    //     options={dropdownOptions}
    //     buttonText={selectedOption || "Monthly"}
    //     className={styles.dropdown}
    //   />
    // );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          {payload.map((item, index) => (
            <p
              key={index}
              className={styles.tooltipItem}
              style={{ color: item.color }}
            >
              {item.name}: {item.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <div className={styles.legendContainer}>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className={styles.legendItem}>
            <div
              className={styles.legendDot}
              style={{
                backgroundColor: entry.color,
              }}
            />
            <span className={styles.legendText}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.graphCard}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {renderDropdown()}
      </div>
      <div className={styles.graphContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 40,
              right: 20,
              left: -20,
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
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dx={-10}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
            />
            <Legend
              content={renderLegend}
              verticalAlign="top"
              align="left"
              height={36}
              wrapperStyle={{
                paddingLeft: "24px",
                marginTop: "-15px",
              }}
            />
            <Area
              type="monotone"
              dataKey="hvo"
              name="HVO"
              stroke="#F97316"
              fill="#FFEDD5"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="videos"
              name="Videos"
              stroke="#1D4ED8"
              fill="#DBEAFE"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
