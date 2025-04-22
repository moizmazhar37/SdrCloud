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
import useGetMiniGraphData from "../MainDashboard/Hooks/useGetMiniGraphData";
import Graph from "../MainDashboard/Graph/Graph";
import Loader from "src/Common/Loader/Loader";
import useGetRealTimeAlerts from "../MainDashboard/Hooks/Alerts/useGetAlerts";
import ToastManager from "src/Common/AlertToast/ToastManager/ToastManager";

const AdminDashboard = () => {
  const [toastMessages, setToastMessages] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popupHeading, setPopupHeading] = useState("");
  const { downloadCSV, loading: csvLoading } = useDownloadCSV();

  // Get mini graph data for popup
  const {
    data: miniGraphData,
    loading: miniGraphLoading,
    error: miniGraphError,
  } = useGetMiniGraphData(popupHeading);

  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
  } = useGetAdminDashboard(dateRange.startDate, dateRange.endDate);

  //Get Alerts for user
  const {
    data: alerts = [],
    loading: alertsLoading,
    error: alertsError,
  } = useGetRealTimeAlerts();

  useEffect(() => {
    if (alerts && alerts.length > 0 && !alertsLoading) {
      setToastMessages(alerts);
    }
  }, [alerts, alertsLoading]);

  const handleDateRangeChange = (newDateRange) => {
    console.log("Date range updated:", newDateRange);
    setDateRange(newDateRange);
  };

  const handleCardClick = (heading) => {
    setPopupHeading(heading);
    setIsPopUpOpen(true);
  };

  const closePopup = () => {
    setIsPopUpOpen(false);
    setPopupHeading(""); // Reset heading when closing popup
  };

  if (dashboardLoading)
    return (
      <div className={styles.loader}>
        <Loader size={160} />
      </div>
    );

  // Only render the dashboard when data is available
  if (!dashboardData) {
    return null;
  }

  const showTopTemplates = false;

  // Destructure the data
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

  const growthRates_metrics = metrics?.growth_rates;
  const growthRates_summaryStats = summaryStats?.growth_rates;

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
        <Card
          heading="Available Seats"
          amount={metrics.availableSeats}
          isClickable={true}
          onClick={() => handleCardClick("Available Seats")}
        />
        <Card
          heading="Credits Spent"
          amount={metrics.creditsSpent}
          {...(growthRates_metrics?.creditsSpent !== null && {
            change: growthRates_metrics?.creditsSpent,
          })}
        />
        <Card
          heading="Credits Available"
          amount={metrics.creditsAvailable}
          {...(growthRates_metrics?.creditsAvailable !== null && {
            change: growthRates_metrics?.creditsAvailable,
          })}
        />
        <Card
          heading="Sheets Connected"
          amount={metrics.sheetsConnected}
          isClickable={true}
          onClick={() => handleCardClick("Sheets Connected")}
          {...(growthRates_metrics?.sheetsConnected !== null && {
            change: growthRates_metrics?.sheetsConnected,
          })}
        />
        <Card
          heading="Templates Generated"
          amount={metrics.templatesGenerated}
          isClickable={true}
          onClick={() => handleCardClick("Templates Generated")}
          {...(growthRates_metrics?.templatesGenerated !== null && {
            change: growthRates_metrics?.templatesGenerated,
          })}
        />
      </div>

      {/* Prospects Overview Section */}
      <div className={styles.componentSection}>
        <h2 className={styles.sectionTitle}>Summary Stats</h2>
        <div className={styles.prospectsCardContainer}>
          <Card
            heading="Campaigns"
            amount={summaryStats.campaigns}
            // isClickable={true}
            // onClick={() => handleCardClick("Campaigns")}
            // Only pass `change` if it's not null
            {...(growthRates_summaryStats?.campaigns !== null && {
              change: growthRates_summaryStats?.campaigns,
            })}
          />

          <Card
            heading="Campaigns"
            amount={summaryStats.campaigns}
            // isClickable={true}
            // onClick={() => handleCardClick("Campaigns")}
            // change={15}
          />
          <Card
            heading="Prospects Added"
            amount={summaryStats.prospectsAdded}
            isClickable={true}
            onClick={() => handleCardClick("Prospects Added")}
            {...(growthRates_summaryStats?.prospectsAdded !== null && {
              change: growthRates_summaryStats?.prospectsAdded,
            })}
          />

          <Card
            heading="Meetings Booked"
            amount={summaryStats.meetingsBooked}
            isClickable={true}
            onClick={() => handleCardClick("Meetings Booked")}
            {...(growthRates_summaryStats?.meetingsBooked !== null && {
              change: growthRates_summaryStats?.meetingsBooked,
            })}
            // isClickable={true}
            // onClick={() => handleCardClick("Meetings Booked")}
            // change={12}
          />

          <Card
            heading="Meeting Attended"
            amount={summaryStats.meetingsAttended}
            isClickable={true}
            onClick={() => handleCardClick("Meeting Attended")}
            {...(growthRates_summaryStats?.meetingsAttended !== null && {
              change: growthRates_summaryStats?.meetingsAttended,
            })}
            // isClickable={true}
            s // onClick={() => handleCardClick("Meeting Attended")}
            // change={-5}
          />

          <Card
            heading="Visitors Identified"
            amount={summaryStats.visitorsIdentified}
            isClickable={true}
            onClick={() => handleCardClick("Visitors Identified")}
            {...(growthRates_summaryStats?.visitorsIdentified !== null && {
              change: growthRates_summaryStats?.visitorsIdentified,
            })}
          />
        </div>
      </div>

      {/* Analytics Overview Section */}
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

      <div className={styles.componentSection}>
        <div className={styles.analyticsContainer}>
          <VisitorsGraph data={visitorsGraphData} />
          <UserCreditsChart creditsData={userCreditsData} />
        </div>
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
            title="Company Users"
            usersData={topUsersData}
            tableHeaders={tableHeaders}
            showDropdown={false}
          />
          {showTopTemplates && (
            <TopUsers
              title="Top Performing Templates"
              usersData={topTemplatesData}
              tableHeaders={tableHeaders2}
              showDropdown={false}
            />
          )}
        </div>
      </div>

      {/* Popup component */}
      <CardPopUpGraph
        isOpen={isPopUpOpen}
        onClose={closePopup}
        heading={popupHeading}
        graphData={miniGraphData}
        loading={miniGraphLoading}
        error={miniGraphError}
      />

      <ToastManager toastMessages={toastMessages} />
    </div>
  );
};

export default AdminDashboard;
