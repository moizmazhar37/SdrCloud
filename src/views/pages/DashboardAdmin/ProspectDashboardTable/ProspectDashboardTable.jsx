import React from "react";
import styles from "./ProspectDashboardTable.module.scss";

const ProspectDashboardTable = () => {
  // Dummy data for the table
  const prospects = [
    {
      id: 1,
      name: "Emma Johnson",
      company: "Company 1",
      phone: "5551234100",
      email: "emmajohnson@example.com",
      campaign: "Realtor SMB",
      lastActivity: "2025-03-01",
      identifiedVisitors: 1,
    },
    {
      id: 2,
      name: "Liam Carter",
      company: "Company 2",
      phone: "5551234101",
      email: "liamcarter@example.com",
      campaign: "Realtor ENT",
      lastActivity: "2025-03-02",
      identifiedVisitors: 2,
    },
    {
      id: 3,
      name: "Ava Thompson",
      company: "Company 3",
      phone: "5551234102",
      email: "avathompson@example.com",
      campaign: "Realtor SMB",
      lastActivity: "2025-03-03",
      identifiedVisitors: 4,
    },
    {
      id: 4,
      name: "Noah Mitchell",
      company: "Company 4",
      phone: "5551234103",
      email: "noahmitchell@example.com",
      campaign: "Realtor ENT",
      lastActivity: "2025-03-04",
      identifiedVisitors: 1,
    },
    {
      id: 5,
      name: "Isabella Perez",
      company: "Company 5",
      phone: "5551234104",
      email: "isabellaperez@example.com",
      campaign: "Realtor SMB",
      lastActivity: "2025-03-05",
      identifiedVisitors: 1,
    },
    {
      id: 6,
      name: "Mason Hughes",
      company: "Company 6",
      phone: "5551234105",
      email: "masonhughes@example.com",
      campaign: "Realtor ENT",
      lastActivity: "2025-03-06",
      identifiedVisitors: 2,
    },
    {
      id: 7,
      name: "Sophia Rivera",
      company: "Company 7",
      phone: "5551234106",
      email: "sophiarivera@example.com",
      campaign: "Realtor SMB",
      lastActivity: "2025-03-07",
      identifiedVisitors: 3,
    },
    {
      id: 8,
      name: "Logan Brooks",
      company: "Company 8",
      phone: "5551234107",
      email: "loganbrooks@example.com",
      campaign: "Realtor ENT",
      lastActivity: "2025-03-08",
      identifiedVisitors: 4,
    },
    {
      id: 9,
      name: "Mia Gray",
      company: "Company 9",
      phone: "5551234108",
      email: "miagray@example.com",
      campaign: "Realtor SMB",
      lastActivity: "2025-03-09",
      identifiedVisitors: 1,
    },
    {
      id: 10,
      name: "Ethan Sanders",
      company: "Company 10",
      phone: "5551234109",
      email: "ethansanders@example.com",
      campaign: "Realtor ENT",
      lastActivity: "2025-03-10",
      identifiedVisitors: 4,
    },
  ];

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
              {prospects.map((prospect) => (
                <tr key={prospect.id}>
                  <td>{prospect.name}</td>
                  <td>{prospect.company}</td>
                  <td>{prospect.phone}</td>
                  <td>{prospect.email}</td>
                  <td>{prospect.campaign}</td>
                  <td>{prospect.lastActivity}</td>
                  <td>{prospect.identifiedVisitors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProspectDashboardTable;
