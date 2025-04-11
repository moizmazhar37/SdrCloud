import React, { useState, useEffect } from "react";
import DateRangeDropdown from "./DateRangeDropdown/DateRangeDropdown";
import SupportContactLabel from "./SupportContactLabel/SupportContactLabel";
import Card from "../MainDashboard/CardBlock/Card";
import styles from "./AdminDashboard.module.scss";
import useDownloadCSV from "../MainDashboard/Hooks/useDownloadCSV";
import TopUsers from "../MainDashboard/TableCardBlock/TabularCard";
import VisitorsGraph from "./VisitorsGraph/VisitorsGraph.jsx";
import UserCreditsChart from "./UserCreditsChart/UserCreditsChart";
import ActiveProspectsLifecycle from "./ActiveProspectsLifeCycle/ActiveProspectsLifeCycle";
import CardPopUpGraph from "../MainDashboard/CardBlock/CardPopUpGraph/CardPopUpGraph";
import useGetAdminDashboard from "../MainDashboard/Hooks/useGetAdminDashboard";
import Graph from "../MainDashboard/Graph/Graph";
import Loader from "src/Common/Loader/Loader";

const AdminDashboard = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popupHeading, setPopupHeading] = useState("");
  const { downloadCSV, loading: csvLoading } = useDownloadCSV();

  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
  } = useGetAdminDashboard(dateRange.startDate, dateRange.endDate);

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    console.log("Date range updated:", newDateRange);
  };

  const handleCardClick = (heading) => {
    setPopupHeading(heading);
    setIsPopUpOpen(true);
  };

  const closePopup = () => {
    setIsPopUpOpen(false);
  };
  if (dashboardLoading)
    return (
      <div className={styles.loader}>
        {" "}
        <Loader size={160} />
      </div>
    );

  // Only render the dashboard when data is available
  if (!dashboardData) {
    return null;
  }

  // Destructure the data for easier access
  const {
    supportInfo,
    metrics,
    aiComponents,
    summaryStats,
    prospectsLifecycleData,
    templatesCreatedData,
    templatesSentData,
    visitDurationData,
    visitorsGraphData,
    userCreditsData,
    topUsersData,
    topTemplatesData,
  } = dashboardData;

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
        <Card
          heading="Active Users"
          amount={metrics.activeUsers}
          isClickable={true}
          onClick={() => handleCardClick("Active Users")}
        />
        <Card heading="Available Seats" amount={metrics.availableSeats} />
        <Card heading="Credits Spent" amount={metrics.creditsSpent} />
        <Card heading="Credits Available" amount={metrics.creditsAvailable} />
        <Card
          heading="Sheets Connected"
          amount={metrics.sheetsConnected}
          isClickable={true}
          onClick={() => handleCardClick("Sheets Connected")}
        />
        <Card
          heading="Templates generated"
          amount={metrics.templatesGenerated}
          isClickable={true}
          onClick={() => handleCardClick("Templates generated")}
        />
      </div>

      {/* AI Components Section */}
      {/* <div className={styles.componentSection}>
        <h2 className={styles.sectionTitle}>AI Components</h2>
        <div className={styles.componentCardContainer}>
          <Card
            heading="AI Agents"
            amount={aiComponents.aiAgents}
            isClickable={true}
            onClick={() => handleCardClick("AI Agents")}
          />
          <Card
            heading="HVO Templates"
            amount={aiComponents.hvoTemplates}
            isClickable={true}
            onClick={() => handleCardClick("HVO Templates")}
          />
          <Card
            heading="Video Templates"
            amount={aiComponents.videoTemplates}
            isClickable={true}
            onClick={() => handleCardClick("Video Templates")}
          />
          <Card
            heading="Emails Templates"
            amount={aiComponents.emailTemplates}
            isClickable={true}
            onClick={() => handleCardClick("Emails Templates")}
          />
          <Card
            heading="SMS Templates"
            amount={aiComponents.smsTemplates}
            isClickable={true}
            onClick={() => handleCardClick("SMS Templates")}
          />
        </div>
      </div> */}

      {/* Prospects Overview Section */}
      <div className={styles.componentSection}>
        <h2 className={styles.sectionTitle}>Summary Stats</h2>
        <div className={styles.prospectsCardContainer}>
          <Card
            heading="Campaigns"
            amount={summaryStats.campaigns}
            isClickable={true}
            onClick={() => handleCardClick("Campaigns")}
            change={15}
          />
          <Card
            heading="Prospects Added"
            amount={summaryStats.prospectsAdded}
            isClickable={true}
            onClick={() => handleCardClick("Prospects Added")}
            change={-10}
          />
          <Card
            heading="Meetings Booked"
            amount={summaryStats.meetingsBooked}
            isClickable={true}
            onClick={() => handleCardClick("Meetings Booked")}
            change={12}
          />
          <Card
            heading="Meeting Attended"
            amount={summaryStats.meetingsAttended}
            isClickable={true}
            onClick={() => handleCardClick("Meeting Attended")}
            change={-5}
          />
          <Card
            heading="Total Sales"
            amount={summaryStats.totalSales}
            isClickable={true}
            onClick={() => handleCardClick("Total Sales")}
          />
          <Card
            heading="Visitors identified"
            amount={summaryStats.visitorsIdentified}
            isClickable={true}
            onClick={() => handleCardClick("Visitors identified")}
          />
        </div>
      </div>

      {/* Analytics Overview Section */}
      <div className={styles.componentSection}>
        <div className={styles.analyticsContainer}>
          <VisitorsGraph data={visitorsGraphData} />
          <UserCreditsChart creditsData={userCreditsData} />
        </div>
      </div>
      <div className={styles.prospectsLifecycleContainer}>
        <ActiveProspectsLifecycle
          data={prospectsLifecycleData}
          title="Active Prospects Lifecycle Over Time (Hover to Explore)"
        />
      </div>

      <div className={styles.GraphContainer}>
        <Graph
          title="Amount of Templates Created"
          data={templatesCreatedData}
          type={"filters"}
        />
        <Graph
          title="Amount of HVOs/Videos Sent"
          data={templatesSentData}
          type={"filters"}
        />
      </div>
      <div className={styles.GraphContainer}>
        <Graph
          title="Visit Duration"
          data={visitDurationData}
          type={"filters"}
        />
      </div>

      {/* Performance Overview Section */}
      <div className={styles.componentSection}>
        <div className={styles.topUsersContainer}>
          <TopUsers
            title="Top Performing Users"
            usersData={topUsersData}
            tableHeaders={tableHeaders}
            showDropdown={false}
          />
          <TopUsers
            title="Top Performing Templates"
            usersData={topTemplatesData}
            tableHeaders={tableHeaders2}
            showDropdown={false}
          />
        </div>
      </div>

      {/* Popup component */}
      <CardPopUpGraph
        isOpen={isPopUpOpen}
        onClose={closePopup}
        heading={popupHeading}
      />
    </div>
  );
};

export default AdminDashboard;
