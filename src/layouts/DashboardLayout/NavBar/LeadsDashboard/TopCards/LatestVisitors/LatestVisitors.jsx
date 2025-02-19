import React from "react";
import styles from "./LatestVisitors.module.scss";
import { Eye } from "lucide-react";

const LatestVisitors = ({ visitors }) => {
  // Hardcoded data - later to be replaced with hook data

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Latest Visitors</h2>
          <button className={styles.viewAll}>View all</button>
        </div>

        <div className={styles.visitorsList}>
          {visitors.map((visitor) => (
            <div key={visitor.id} className={styles.visitorItem}>
              <div className={styles.visitorInfo}>
                <div className={styles.visitorName}>{visitor.name}</div>
                <div className={styles.timestamp}>{visitor.timestamp}</div>
              </div>
              <button className={styles.viewButton}>
                <Eye size={20} className={styles.eyeIcon} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestVisitors;
