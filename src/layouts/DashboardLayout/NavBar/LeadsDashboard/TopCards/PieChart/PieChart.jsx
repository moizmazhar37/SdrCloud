import React from "react";
import {
  PieChart as RechartPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import styles from "./PieChart.module.scss";

const PieChart = ({ title, data }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#00A3E0", "#003B71"];

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    value,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    // Adjust the radius to position labels more centrally in their segments
    const radius = (innerRadius + outerRadius) * 0.5;
    // Calculate position based on the segment's midpoint
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#FFFFFF"
        textAnchor="middle"
        dominantBaseline="central"
        className={styles.percentageLabel}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            <RechartPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius={100}
                innerRadius={0}
                paddingAngle={0}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
            </RechartPieChart>
          </ResponsiveContainer>
          <div className={styles.legend}>
            {chartData.map((entry, index) => (
              <div key={`legend-${index}`} className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className={styles.legendLabel}>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
