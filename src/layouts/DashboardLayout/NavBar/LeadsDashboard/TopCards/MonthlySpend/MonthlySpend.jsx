import React from "react";
import styles from "./MonthlySpend.module.scss";
import { DollarSign } from "lucide-react";

const MonthlySpend = ({ data }) => {
  // Hardcoded data - later to be replaced with hook data

  // Example of how it would look with data
  // const data = {
  //   spend: 1500,
  //   percentage: 75,
  //   budget: 2000
  // };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <DollarSign className={styles.icon} size={20} />
          <span className={styles.title}>Monthly Spend</span>
        </div>

        <div className={styles.amount}>${data.spend.toLocaleString()}</div>

        <div className={styles.chartContainer}>
          <div className={styles.progressCircle}>
            <svg viewBox="0 0 36 36" className={styles.circularChart}>
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              {data.percentage !== null && (
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1E40AF"
                  strokeWidth="3"
                  strokeDasharray={`${data.percentage}, 100`}
                />
              )}
            </svg>
            <div className={styles.percentage}>
              {data.percentage !== null ? `${data.percentage}%` : "--"}%
            </div>
          </div>
        </div>

        <div className={styles.budgetInfo}>
          Current Monthly Budget: ${data.budget.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default MonthlySpend;
