import React from "react";
import styles from "./IdentifiedByMonth.module.scss";
import { User } from "lucide-react";

const IdentifiedByMonth = () => {
  // Hardcoded data - later to be replaced with hook data
  const data = {
    identified: 41,
    percentage: 9,
    previousPeriod: 10,
    budgetedIdentifications: 500,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <User className={styles.icon} size={20} />
          <span className={styles.title}>Identified This Month</span>
        </div>

        <div className={styles.count}>{data.identified}</div>

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
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#1E40AF"
                strokeWidth="3"
                strokeDasharray={`${data.percentage}, 100`}
              />
            </svg>
            <div className={styles.percentage}>{data.percentage}%</div>
          </div>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.previousPeriod}>
            Previous Period: {data.previousPeriod}
          </div>
          <div className={styles.budgeted}>
            Budgeted Monthly Identifications: {data.budgetedIdentifications}
          </div>
          <div className={styles.note}>
            Known Customers & Associates{" "}
            <span>are not counted in the number above.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentifiedByMonth;
