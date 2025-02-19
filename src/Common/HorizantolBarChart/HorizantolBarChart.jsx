import React from "react";
import styles from "./HorizantolBarChart.module.scss";

const HorizantolBarChart = ({ title, data }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.chartContainer}>
          {data.map((item, index) => (
            <div key={index} className={styles.barRow}>
              <div className={styles.label}>{item.label}</div>
              <div className={styles.barContainer}>
                <div className={styles.barWrapper} style={{ flex: 1 }}>
                  <div
                    className={styles.bar}
                    style={{
                      width: `${(item.value / maxValue) * 100}%`,
                    }}
                  />
                </div>
                <span className={styles.value}>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HorizantolBarChart;
