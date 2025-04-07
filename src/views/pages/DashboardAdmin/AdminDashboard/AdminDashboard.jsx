import React, { useState } from "react";
import DateRangeDropdown from "./DateRangeDropdown/DateRangeDropdown";
import SupportContactLabel from "./SupportContactLabel/SupportContactLabel";
import Card from "../MainDashboard/CardBlock/Card";
import styles from "./AdminDashboard.module.scss";
import useDownloadCSV from "../MainDashboard/Hooks/useDownloadCSV";
import TopUsers from "../MainDashboard/TableCardBlock/TabularCard";
import VisitorsGraph from "./VisitorsGraph/VisitorsGraph.jsx";
import UserCreditsChart from "./UserCreditsChart/UserCreditsChart";
import ActiveProspectsLifecycle from "./ActiveProspectsLifeCycle/ActiveProspectsLifeCycle";

const AdminDashboard = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { downloadCSV, loading: csvLoading } = useDownloadCSV();

  // Sample data for credits usage chart
  const creditsData = [
    { month: "Jan", credits: 5300, usage: 2900 },
    { month: "Feb", credits: 4500, usage: 2800 },
    { month: "Mar", credits: 4600, usage: 2200 },
    { month: "Apr", credits: 4500, usage: 2700 },
    { month: "May", credits: 4500, usage: 2400 },
    { month: "Jun", credits: 2800, usage: 2000 },
    { month: "Jul", credits: 4800, usage: 3200 },
  ];

  const prospectsLifecycleData = [
    { date: "2024-01-01", product1: -60, product2: 20, product3: -20 },
    { date: "2024-02-01", product1: -30, product2: 20, product3: -60 },
    { date: "2024-03-01", product1: 50, product2: -40, product3: -100 },
    { date: "2024-04-01", product1: 0, product2: -60, product3: -100 },
    { date: "2024-05-01", product1: 20, product2: -40, product3: -60 },
    { date: "2024-06-01", product1: -80, product2: 0, product3: -60 },
    { date: "2024-07-01", product1: 40, product2: 30, product3: -10 },
  ];
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

  // Sample data for top users
  const topUsersData = [
    {
      name: "Afnan Bashir",
      credits: 0.0,
      score: 0,
      image:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png",
    },
  ];

  // Sample data for top templates
  const toptemplatesData = [
    {
      group: 1,
      template_name: "1ASDF$",
      template_type: "HVO",
      viewed_count: 4,
    },
    {
      group: 1,
      template_name: "test bulk update sheet",
      template_type: "VIDEO",
      viewed_count: 5,
    },
    {
      group: 2,
      template_name: "24 feb",
      template_type: "VIDEO",
      viewed_count: 1,
    },
    {
      group: 2,
      template_name: "adnan demo",
      template_type: "VIDEO",
      viewed_count: 24,
    },
    {
      group: 3,
      template_name: "Adnan Demo 2",
      template_type: "VIDEO",
      viewed_count: 10,
    },
  ];

  // Table headers for users
  const tableHeaders = [
    { key: "name", label: "Name" },
    { key: "credits", label: "Credits used" },
    { key: "score", label: "Score" },
  ];

  // Table headers for templates
  const tableHeaders2 = [
    { key: "template_name", label: "Name" },
    { key: "template_type", label: "Type" },
    { key: "viewed_count", label: "Times Used" },
  ];

  

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
        <Card heading="Available Seats" amount={45} />
        <Card heading="Credits Spent" amount={20000} />
        <Card heading="Credits Available" amount={20000} />
        <Card heading="Sheets Connected" amount={3839} />
        <Card heading="Templates generated" amount={4849} />
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
        <h2 className={styles.sectionTitle}>Summary Stats</h2>
        <div className={styles.prospectsCardContainer}>
          <Card heading="Campaigns" amount={800} change={15} />
          <Card heading="Prospects Added" amount={700} change={-10} />
          <Card heading="Meetings Booked" amount={204} change={5} />
          <Card heading="Meeting Attended" amount={75} change={-8} />
          <Card heading="Total Sales" amount={500} change={20} />
          <Card heading="Visitors identified" amount={400} change={-12} />
        </div>

      </div>

      {/* Performance Overview Section */}
      <div className={styles.componentSection}>
        <h2 className={styles.sectionTitle}>Performance Overview</h2>
        <div className={styles.topUsersContainer}>
          <TopUsers
            title="Top Performing Users"
            usersData={topUsersData}
            tableHeaders={tableHeaders}
          />
          <TopUsers
            title="Top Performing Templates"
            usersData={toptemplatesData}
            tableHeaders={tableHeaders2}
          />
        </div>
      </div>

      {/* Analytics Overview Section */}
      <div className={styles.componentSection}>
        <div className={styles.analyticsContainer}>
          <VisitorsGraph />
          <UserCreditsChart creditsData={creditsData} />
        </div>
      </div>
      <div className={styles.prospectsLifecycleContainer}>
        <ActiveProspectsLifecycle
          data={prospectsLifecycleData}
          title="Active Prospects Lifecycle Over Time (Hover to Explore)"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
