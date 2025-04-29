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
  // Store dateRange in a persistent state
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

  // This function is called when the DateRangeDropdown component updates the date range
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

  // Destructure the data for easier access
  const {
    supportInfo,
    metrics,
    aiComponents,
    summaryStats,
    prospectsLifecycleData,
    templates_created_data,
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
    { key: "role", label: "Role" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "active_prospects", label: "Active Prospects" },
    { key: "booked_meetings", label: "Booked Meetings" },
    { key: "viewAs", label: "View As" },
    { key: "editUser", label: "Edit User" },
  ];

  // Table headers for templates
  const tableHeaders2 = [
    { key: "template_name", label: "Name" },
    { key: "template_type", label: "Type" },
    { key: "viewed_count", label: "Times Used" },
  ];

  const shouldShowChange = (change) => {
    return change !== null && change !== undefined && change !== "none";
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Header Section with Support Contact and Action Buttons */}
      <div className={styles.headerSection}>
        <SupportContactLabel
          manager={supportInfo?.manager || ""}
          phone={supportInfo?.phone || ""}
          email={supportInfo?.email || ""}
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
          {/* Pass the current dateRange to the DateRangeDropdown component */}
          <DateRangeDropdown
            onDateRangeChange={handleDateRangeChange}
            initialDateRange={dateRange}
          />
        </div>
      </div>

      {/* Main Metrics Section */}
      <div className={styles.metricsCardContainer}>
        <Card
          heading="Active Users"
          amount={metrics?.activeUsers || 0}
          isClickable={true}
          onClick={() => handleCardClick("Active Users")}
        />
        <Card heading="Available Seats" amount={metrics?.availableSeats || 0} />
        <Card
          heading="Credits Spent"
          amount={metrics?.creditsSpent || 0}
          change={
            shouldShowChange(metrics?.growth_rates?.creditsSpent)
              ? metrics?.growth_rates?.creditsSpent
              : undefined
          }
        />
        <Card
          heading="Credits Available"
          amount={metrics?.creditsAvailable || 0}
          change={
            shouldShowChange(metrics?.growth_rates?.creditsAvailable)
              ? metrics?.growth_rates?.creditsAvailable
              : undefined
          }
        />
        <Card
          heading="Sheets Connected"
          amount={metrics?.sheetsConnected || 0}
          isClickable={true}
          onClick={() => handleCardClick("Sheets Connected")}
          change={
            shouldShowChange(metrics?.growth_rates?.sheetsConnected)
              ? metrics?.growth_rates?.sheetsConnected
              : undefined
          }
        />
        <Card
          heading="Templates Generated"
          amount={metrics?.templatesGenerated || 0}
          isClickable={true}
          onClick={() => handleCardClick("Templates Generated")}
          change={
            shouldShowChange(metrics?.growth_rates?.templatesGenerated)
              ? metrics?.growth_rates?.templatesGenerated
              : undefined
          }
        />
      </div>

      {/* Prospects Overview Section */}
      <div className={styles.componentSection}>
        <h2 className={styles.sectionTitle}>Summary Stats</h2>
        <div className={styles.prospectsCardContainer}>
          <Card
            heading="Campaigns"
            amount={summaryStats?.campaigns || 0}
            isClickable={true}
            onClick={() => handleCardClick("Campaigns")}
            change={
              shouldShowChange(summaryStats?.growth_rates?.campaigns)
                ? summaryStats?.growth_rates?.campaigns
                : undefined
            }
          />
          <Card
            heading="Prospects Added"
            amount={summaryStats?.prospectsAdded || 0}
            isClickable={true}
            onClick={() => handleCardClick("Prospects Added")}
            change={
              shouldShowChange(summaryStats?.growth_rates?.prospectsAdded)
                ? summaryStats?.growth_rates?.prospectsAdded
                : undefined
            }
          />
          <Card
            heading="Meetings Booked"
            amount={summaryStats?.meetingsBooked || 0}
            isClickable={false}
            // onClick={() => handleCardClick("Meetings Booked")}
            change={
              shouldShowChange(summaryStats?.growth_rates?.meetingsBooked)
                ? summaryStats?.growth_rates?.meetingsBooked
                : undefined
            }
          />
          <Card
            heading="Meeting Attended"
            amount={summaryStats?.meetingsAttended || 0}
            isClickable={false}
            // onClick={() => handleCardClick("Meeting Attended")}
            change={
              shouldShowChange(summaryStats?.growth_rates?.meetingsAttended)
                ? summaryStats?.growth_rates?.meetingsAttended
                : undefined
            }
          />
          <Card
            heading="Visitors Identified"
            amount={summaryStats?.visitorsIdentified || 0}
            isClickable={true}
            onClick={() => handleCardClick("Visitors Identified")}
            change={
              shouldShowChange(summaryStats?.growth_rates?.visitorsIdentified)
                ? summaryStats?.growth_rates?.visitorsIdentified
                : undefined
            }
          />
        </div>
      </div>

      {/* Analytics Overview Section */}
      <div className={styles.prospectsLifecycleContainer}>
        {prospectsLifecycleData && (
          <ActiveProspectsLifecycle
            data={prospectsLifecycleData}
            title="Active Prospects Lifecycle Over Time (Hover to Explore)"
          />
        )}
      </div>

      <div className={styles.GraphContainer}>
        <Graph
          title="Amount of Templates Created"
          data={templates_created_data || []}
          type={"filters"}
        />
        <Graph
          title="Amount of HVOs/Videos Sent"
          data={templatesSentData || []}
          type={"filters"}
        />
      </div>

      <div className={styles.componentSection}>
        <div className={styles.analyticsContainer}>
          <VisitorsGraph data={visitorsGraphData || []} />
          <UserCreditsChart creditsData={userCreditsData || []} />
        </div>
      </div>

      <div className={styles.GraphContainer}>
        <Graph
          title="Visit Duration"
          data={visitDurationData || []}
          type={"filters"}
        />
      </div>

      {/* Performance Overview Section */}
      <div className={styles.componentSection}>
        <div className={styles.topUsersContainer}>
          <TopUsers
            title="Company Users"
            usersData={topUsersData || []}
            tableHeaders={tableHeaders}
            showDropdown={false}
          />
          {showTopTemplates &&
            topTemplatesData &&
            topTemplatesData.length > 0 && (
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
