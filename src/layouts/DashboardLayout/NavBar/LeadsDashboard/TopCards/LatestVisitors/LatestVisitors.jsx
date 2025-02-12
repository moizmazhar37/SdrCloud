import React from "react";
import styles from "./LatestVisitors.module.scss";
import { Eye } from "lucide-react";

const LatestVisitors = () => {
  // Hardcoded data - later to be replaced with hook data
  const visitors = [
    {
      id: 1,
      name: "Roy Ericson",
      timestamp: "11/12/2024 7:44:04 PM",
    },
    {
      id: 2,
      name: "Peggy Gan",
      timestamp: "11/12/2024 1:40:08 PM",
    },
    {
      id: 3,
      name: "Kim Cochran",
      timestamp: "11/12/2024 5:27:52 AM",
    },
    {
      id: 4,
      name: "Melvin Mathis",
      timestamp: "11/12/2024 2:16:35 AM",
    },
    {
      id: 5,
      name: "Fernando Walker",
      timestamp: "11/11/2024 8:59:56 PM",
    },
  ];

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
