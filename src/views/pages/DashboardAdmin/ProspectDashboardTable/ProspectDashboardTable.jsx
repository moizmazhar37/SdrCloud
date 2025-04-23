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
      score: 73,
      campaign: "Realtor SMB",
      sentiment: "Positive",
      lastActivity: "2025-03-01",
      meetingBooked: "Yes",
      identifiedVisitors: 1,
      callDuration: "00:41",
      emailClicks: 2,
      smsReplies: 2,
      action: "Meeting Booked",
    },
    {
      id: 2,
      name: "Liam Carter",
      company: "Company 2",
      phone: "5551234101",
      email: "liamcarter@example.com",
      score: 65,
      campaign: "Realtor ENT",
      sentiment: "Neutral",
      lastActivity: "2025-03-02",
      meetingBooked: "No",
      identifiedVisitors: 2,
      callDuration: "01:46",
      emailClicks: 3,
      smsReplies: 1,
      action: "Silent",
    },
    {
      id: 3,
      name: "Ava Thompson",
      company: "Company 3",
      phone: "5551234102",
      email: "avathompson@example.com",
      score: 53,
      campaign: "Realtor SMB",
      sentiment: "Negative",
      lastActivity: "2025-03-03",
      meetingBooked: "No",
      identifiedVisitors: 4,
      callDuration: "02:03",
      emailClicks: 3,
      smsReplies: 2,
      action: "Silent",
    },
    {
      id: 4,
      name: "Noah Mitchell",
      company: "Company 4",
      phone: "5551234103",
      email: "noahmitchell@example.com",
      score: 37,
      campaign: "Realtor ENT",
      sentiment: "Positive",
      lastActivity: "2025-03-04",
      meetingBooked: "No",
      identifiedVisitors: 1,
      callDuration: "03:32",
      emailClicks: 2,
      smsReplies: 2,
      action: "Phone Campaign",
    },
    {
      id: 5,
      name: "Isabella Perez",
      company: "Company 5",
      phone: "5551234104",
      email: "isabellaperez@example.com",
      score: 84,
      campaign: "Realtor SMB",
      sentiment: "Neutral",
      lastActivity: "2025-03-05",
      meetingBooked: "Yes",
      identifiedVisitors: 1,
      callDuration: "02:23",
      emailClicks: 1,
      smsReplies: 1,
      action: "Silent",
    },
    {
      id: 6,
      name: "Mason Hughes",
      company: "Company 6",
      phone: "5551234105",
      email: "masonhughes@example.com",
      score: 41,
      campaign: "Realtor ENT",
      sentiment: "Negative",
      lastActivity: "2025-03-06",
      meetingBooked: "No",
      identifiedVisitors: 2,
      callDuration: "00:40",
      emailClicks: 3,
      smsReplies: 2,
      action: "Silent",
    },
    {
      id: 7,
      name: "Sophia Rivera",
      company: "Company 7",
      phone: "5551234106",
      email: "sophiarivera@example.com",
      score: 87,
      campaign: "Realtor SMB",
      sentiment: "Positive",
      lastActivity: "2025-03-07",
      meetingBooked: "No",
      identifiedVisitors: 3,
      callDuration: "00:08",
      emailClicks: 2,
      smsReplies: 2,
      action: "Meeting Booked",
    },
    {
      id: 8,
      name: "Logan Brooks",
      company: "Company 8",
      phone: "5551234107",
      email: "loganbrooks@example.com",
      score: 35,
      campaign: "Realtor ENT",
      sentiment: "Neutral",
      lastActivity: "2025-03-08",
      meetingBooked: "No",
      identifiedVisitors: 4,
      callDuration: "03:50",
      emailClicks: 1,
      smsReplies: 2,
      action: "Silent",
    },
    {
      id: 9,
      name: "Mia Gray",
      company: "Company 9",
      phone: "5551234108",
      email: "miagray@example.com",
      score: 55,
      campaign: "Realtor SMB",
      sentiment: "Negative",
      lastActivity: "2025-03-09",
      meetingBooked: "Yes",
      identifiedVisitors: 1,
      callDuration: "00:58",
      emailClicks: 2,
      smsReplies: 2,
      action: "Silent",
    },
    {
      id: 10,
      name: "Ethan Sanders",
      company: "Company 10",
      phone: "5551234109",
      email: "ethansanders@example.com",
      score: 77,
      campaign: "Realtor ENT",
      sentiment: "Positive",
      lastActivity: "2025-03-10",
      meetingBooked: "No",
      identifiedVisitors: 4,
      callDuration: "00:24",
      emailClicks: 2,
      smsReplies: 2,
      action: "Silent",
    },
  ];

  // Function to determine score color class
  const getScoreColorClass = (score) => {
    if (score >= 70) return styles.scoreHigh;
    if (score >= 50) return styles.scoreMedium;
    return styles.scoreLow;
  };

  // Function to determine sentiment class
  const getSentimentClass = (sentiment) => {
    if (sentiment === "Positive") return styles.sentimentPositive;
    if (sentiment === "Negative") return styles.sentimentNegative;
    return styles.sentimentNeutral;
  };

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
                <th>Score</th>
                <th>Campaign</th>
                <th>Sentiment</th>
                <th>Last Activity</th>
                <th>Meeting Booked</th>
                <th>Identified Visitors</th>
                <th>AI Call Duration</th>
                <th>Email Clicks</th>
                <th>SMS Replies</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {prospects.map((prospect) => (
                <tr key={prospect.id}>
                  <td>{prospect.name}</td>
                  <td>{prospect.company}</td>
                  <td>{prospect.phone}</td>
                  <td>{prospect.email}</td>
                  <td>
                    <span
                      className={`${styles.scoreCell} ${getScoreColorClass(
                        prospect.score
                      )}`}
                    >
                      {prospect.score}
                    </span>
                  </td>
                  <td>{prospect.campaign}</td>
                  <td>
                    <span
                      className={`${styles.sentimentCell} ${getSentimentClass(
                        prospect.sentiment
                      )}`}
                    >
                      {prospect.sentiment}
                    </span>
                  </td>
                  <td>{prospect.lastActivity}</td>
                  <td>{prospect.meetingBooked}</td>
                  <td>{prospect.identifiedVisitors}</td>
                  <td>{prospect.callDuration}</td>
                  <td>{prospect.emailClicks}</td>
                  <td>{prospect.smsReplies}</td>
                  <td>
                    <button
                      className={`${styles.actionButton} ${
                        prospect.action === "Meeting Booked"
                          ? styles.meetingBooked
                          : prospect.action === "Phone Campaign"
                          ? styles.phoneCampaign
                          : styles.silent
                      }`}
                    >
                      {prospect.action}
                    </button>
                  </td>
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
