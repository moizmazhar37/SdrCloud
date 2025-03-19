import React, { useState } from "react";
import DateRangeDropdown from "./DateRangeDropdown/DateRangeDropdown";
import SupportContactLabel from "./SupportContactLabel/SupportContactLabel";
import Card from "../MainDashboard/CardBlock/Card";
import styles from "./AdminDashboard.module.scss";
import useDownloadCSV from "../MainDashboard/Hooks/useDownloadCSV";

const AdminDashboard = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { downloadCSV, loading: csvLoading } = useDownloadCSV();

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    // Here you can perform additional actions like fetching data for the selected date range
    console.log("Date range updated:", newDateRange);
  };

  // Support contact information
  const supportInfo = {
    manager: "Janice Stevens",
    phone: "967-278-0909",
    email: "Janice@sdrcloud.com",
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Header Section with Support Contact and Action Buttons */}
      <div className={styles.headerSection}>
        <SupportContactLabel
          manager={supportInfo.manager}
          phone={supportInfo.phone}
          email={supportInfo.email}
        />
        <div className={styles.actionButtons}>
          <button
            onClick={downloadCSV}
            disabled={csvLoading}
            className={styles.downloadButton}
          >
            {csvLoading
              ? "Downloading..."
              : "Download Transaction history report"}
          </button>
          <DateRangeDropdown onDateRangeChange={handleDateRangeChange} />
        </div>
      </div>

      {/* Main Metrics Section */}
      <div className={styles.metricsCardContainer}>
        <Card heading="Active Users" amount={200} />
        <Card heading="Avaialable Seats" amount={45} />
        <Card heading="Credits" amount={20000} />
        <Card heading="No of Sheets Connected" amount={3839} />
        <Card heading="Amounts of templates generated" amount={4849} />
      </div>

      {/* AI Components Section */}
      <div className={styles.componentSection}>
        <h2 className={styles.sectionTitle}>AI Components</h2>
        <div className={styles.componentCardContainer}>
          <Card heading="AI Agents" amount={200} />
          <Card heading="HVO Templates" amount={45} />
          <Card heading="Video Templates" amount={20000} />
          <Card heading="Emails Templates" amount={4849} />
          <Card heading="SMS Templates" amount={4849} />
        </div>
      </div>

      {/* Prospects Overview Section */}
      <div className={styles.componentSection}>
        <h2 className={styles.sectionTitle}>Prospects Overview</h2>
        <div className={styles.prospectsCardContainer}>
          <Card heading="Total prospects" amount={12334} />
          <Card heading="HVO Templates" amount={2665} />
          <Card heading="Meetings Booked" amount={234} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
