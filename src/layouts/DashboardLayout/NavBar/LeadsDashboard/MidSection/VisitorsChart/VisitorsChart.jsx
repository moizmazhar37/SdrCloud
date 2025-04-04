import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts"; // Added Cell component for individual bar styling
import styles from "./VisitorsChart.module.scss";

const VisitorsChart = ({ data, onBarClick }) => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const handleBarClick = (entry, index) => {
    setActiveIndex(index);
    if (onBarClick && entry.date) {
      onBarClick(entry.date);
    }
  };

  // Custom cursor style for bars to indicate they're clickable
  const getBarCursor = () => {
    return "pointer";
  };

  // For highlighting the active bar
  const getBarFill = (index) => {
    return index === activeIndex ? "#0073e6" : "#0096FF";
  };

  return (
    <div className={styles?.chartContainer || ""}>
      <h3 className={styles?.title || ""}>Visitors Identified</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={30}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: "#666" }} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="visitors"
            cursor={getBarCursor()}
            onClick={handleBarClick}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarFill(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorsChart;
