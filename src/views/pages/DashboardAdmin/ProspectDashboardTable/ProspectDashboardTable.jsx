import React from "react";
import styles from "./ProspectDashboardTable.module.scss";

const ProspectDashboardTable = ({ prospects = [] }) => {
  // Check if prospects array is valid and has data
  const hasData = Array.isArray(prospects) && prospects.length > 0;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardCard}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Prospect List Dashboard</h1>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.prospectsTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Campaign</th>
                <th>Last Activity</th>
                <th>Identified Visitors</th>
              </tr>
            </thead>
            <tbody>
              {hasData ? (
                prospects.map((prospect) => (
                  <tr key={prospect.id}>
                    <td>{prospect.name}</td>
                    <td>{prospect.company}</td>
                    <td>{prospect.phone}</td>
                    <td>{prospect.email}</td>
                    <td>{prospect.campaign}</td>
                    <td>{prospect.lastActivity}</td>
                    <td>{prospect.identifiedVisitors}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={styles.noDataMessage}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProspectDashboardTable;
