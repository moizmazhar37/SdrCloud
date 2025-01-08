import React, { useState, useEffect } from "react";
import Card from "./CardBlock/Card";
import TopUsers from "./TableCardBlock/TabularCard";
import Graph from "./Graph/Graph";
import useUserCounts from "./Hooks/useUserStats";
import useGraphData from "./Hooks/useTemplateCounts";
import useTopUsers from "./Hooks/useTopUsers";
import useTopTemplates from "./Hooks/useTopTemplates";
import useDownloadCSV from "./Hooks/useDownloadCSV";
import useLeads from "./Hooks/useLeads";
import useUrls from "./Hooks/useUrls";
import useHvoVideoSent from "./Hooks/useHvoVideoSent";
import styles from "./MainDashboard.module.scss";
import LeadsGraph from "./LeadsGraph/LeadsGraph";

const MainDashboard = () => {
  // State management for various time-based filters
  const [selectedTimeStamp, setSelectedTimeStamp] = useState("Current Month");
  const [selectedGraphTimeStamp, setSelectedGraphTimeStamp] = useState("Monthly");
  const [selectedTimeStampForTemplate, setSelectedTimeStampForTemplate] = useState("Current Month");
  const [selectedSentHvoVideoTimestamp, setSelectedSentHvoVideoTimestamp] = useState("Current Month");
  const [hvoVideoTimeframe, setHvoVideoTimeframe] = useState("month");
  const [isViewed, setIsViewed] = useState(false);
  const [userTimePeriod, setUserTimePeriod] = useState("month");
  const [templateTimePeriod, setTemplateTimePeriod] = useState("month");
  const [graphTimePeriod, setGraphTimePeriod] = useState("month");

  // Custom hooks for fetching data
  const { statsData = {}, isStatsLoading, statsError } = useUserCounts();
  const { GraphData = [] } = useGraphData(graphTimePeriod);
  const { topUsersData = [] } = useTopUsers(userTimePeriod);
  const { toptemplatesData = [] } = useTopTemplates(templateTimePeriod);
  const { hvoVideoData = [], loading: hvoLoading } = useHvoVideoSent(hvoVideoTimeframe, isViewed);
  const { urls = [], loadingUrls, errorInUrls } = useUrls();
  const { downloadCSV, loading: csvLoading } = useDownloadCSV();

  // Get user type from localStorage
  const userType = localStorage.getItem('userType');

  // Utility function to round numbers and format as currency
  const roundNumber = (num, decimals = 2) => {
    if (num === undefined || num === null) return "$0.00";
    const factor = Math.pow(10, decimals);
    const rounded = (Math.round(num * factor) / factor).toFixed(decimals);
    return `$${rounded}`;
  };

  // Graph dropdown options
  const dropdownOptionsForGraph = [
    {
      label: "Monthly",
      onClick: () => {
        setSelectedGraphTimeStamp("Monthly");
        setGraphTimePeriod("month");
      },
    },
    {
      label: "Yearly",
      onClick: () => {
        setSelectedGraphTimeStamp("Yearly");
        setGraphTimePeriod("year");
      },
    },
    {
      label: "Weekly",
      onClick: () => {
        setSelectedGraphTimeStamp("Weekly");
        setGraphTimePeriod("week");
      },
    },
  ];

  // HVO Video graph dropdown options
  const dropdownOptionsHvoVideoGraph = [
    {
      label: "Monthly",
      onClick: () => {
        setSelectedSentHvoVideoTimestamp("Monthly");
        setHvoVideoTimeframe("month");
      },
    },
    {
      label: "Yearly",
      onClick: () => {
        setSelectedSentHvoVideoTimestamp("Yearly");
        setHvoVideoTimeframe("year");
      },
    },
    {
      label: "Weekly",
      onClick: () => {
        setSelectedSentHvoVideoTimestamp("Weekly");
        setHvoVideoTimeframe("week");
      },
    },
  ];

  // User dropdown options
  const dropdownOptionsForUser = [
    {
      label: "Current Month",
      onClick: () => {
        setSelectedTimeStamp("Current Month");
        setUserTimePeriod("month");
      },
    },
    {
      label: "Current Year",
      onClick: () => {
        setSelectedTimeStamp("Current Year");
        setUserTimePeriod("year");
      },
    },
    {
      label: "Current Week",
      onClick: () => {
        setSelectedTimeStamp("Current Week");
        setUserTimePeriod("week");
      },
    },
  ];

  // Template dropdown options
  const dropdownOptionsForTemplate = [
    {
      label: "Current Month",
      onClick: () => {
        setSelectedTimeStampForTemplate("Current Month");
        setTemplateTimePeriod("month");
      },
    },
    {
      label: "Current Year",
      onClick: () => {
        setSelectedTimeStampForTemplate("Yearly");
        setTemplateTimePeriod("year");
      },
    },
    {
      label: "Current Week",
      onClick: () => {
        setSelectedTimeStampForTemplate("Weekly");
        setTemplateTimePeriod("week");
      },
    },
  ];

  // Table headers configuration
  const tableHeaders = [
    { key: "name", label: "Name" },
    { key: "credits", label: "Credits used" },
    { key: "score", label: "Score" },
  ];

  const tableHeaders2 = [
    { key: "template_name", label: "Name" },
    { key: "template_type", label: "Type" },
    { key: "viewed_count", label: "Times Used" },
  ];

  // Timeframe options for leads graph
  const timeframeOptions = [
    { label: "Monthly" },
    { label: "Yearly" },
    { label: "Weekly" },
  ];

  // Create website options only when urls data is available
  const websiteOptions = React.useMemo(() => {
    if (!urls || loadingUrls) return [];
    return urls.map(url => ({
      label: url
    }));
  }, [urls, loadingUrls]);

  return (
    <>
      <div className={styles.topContainer}>
        <p>Transaction Report History</p>
        <button 
          onClick={downloadCSV} 
          disabled={csvLoading}
          className={styles.downloadButton}
        >
          {csvLoading ? "Downloading..." : "Download"}
        </button>
      </div>

      <div className={styles.cardsContainer}>
        <Card
          heading="Tokens spent"
          amount={roundNumber(statsData?.tokens_spent)}
        />
        <Card
          heading="Remaining Tokens"
          amount={roundNumber(statsData?.remaining_tokens)}
        />
        <Card
          heading="Total sheets connected"
          amount={statsData?.total_sheets || 0}
        />
        <Card
          heading="Templates Generated"
          amount={statsData?.total_templates || 0}
        />
      </div>

      <div className={styles.TableSection}>
        <div className={styles.TopUserContainer}>
          {userType === "SUBADMIN" && (
            <TopUsers
              title="Top Performing Users"
              dropdownOptions={dropdownOptionsForUser}
              usersData={topUsersData}
              tableHeaders={tableHeaders}
              buttonText={selectedTimeStamp}
            />
          )}
          <TopUsers
            title="Top Performing Templates"
            dropdownOptions={dropdownOptionsForTemplate}
            usersData={toptemplatesData}
            tableHeaders={tableHeaders2}
            buttonText={selectedTimeStampForTemplate}
          />
        </div>
      </div>

      <div>
        <div className={styles.GraphContainer}>
          <Graph
            title="Amount of Templates Created"
            data={GraphData}
            dropdownOptions={dropdownOptionsForGraph}
            selectedOption={selectedGraphTimeStamp}
            type="dropdown"
          />
          <Graph
            title="Amount of HVOs/Videos Sent"
            data={hvoVideoData}
            dropdownOptions={dropdownOptionsHvoVideoGraph}
            selectedOption={selectedSentHvoVideoTimestamp}
            type="filters"
            loading={hvoLoading}
            setIsViewed={setIsViewed}
          />
        </div>

        {userType === "SUBADMIN" && !loadingUrls && websiteOptions.length > 0 && (
          <div className={styles.LeadsGraphContainer}>
            <LeadsGraph
              timeframeOptions={timeframeOptions}
              websiteOptions={websiteOptions}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MainDashboard;