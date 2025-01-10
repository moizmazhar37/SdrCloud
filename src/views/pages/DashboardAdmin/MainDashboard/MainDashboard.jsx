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
import {
  roundNumber,
  dropdownOptionsForGraph,
  dropdownOptionsHvoVideoGraph,
  dropdownOptionsForUser,
  dropdownOptionsForTemplate,
  tableHeaders,
  tableHeaders2,
} from "./helpers";

const MainDashboard = () => {
  // State management for various time-based filters
  const [selectedTimeStamp, setSelectedTimeStamp] = useState("Current Month");
  const [selectedGraphTimeStamp, setSelectedGraphTimeStamp] = useState("Monthly");
  const [selectedTimeStampForTemplate, setSelectedTimeStampForTemplate] = useState("Current Month");
  const [selectedSentHvoVideoTimestamp, setSelectedSentHvoVideoTimestamp] = useState("Current Month");
  const [hvoVideoTimeframe, setHvoVideoTimeframe] = useState("month");
  const [isViewed, setIsViewed] = useState(null);
  const [userTimePeriod, setUserTimePeriod] = useState("month");
  const [templateTimePeriod, setTemplateTimePeriod] = useState("month");
  const [graphTimePeriod, setGraphTimePeriod] = useState("month");

  const { statsData = {}, isStatsLoading, statsError } = useUserCounts();
  const { GraphData = [] } = useGraphData(graphTimePeriod);
  const { topUsersData = [] } = useTopUsers(userTimePeriod);
  const { toptemplatesData = [] } = useTopTemplates(templateTimePeriod);
  const { hvoVideoData = [], loading: hvoLoading } = useHvoVideoSent(hvoVideoTimeframe, isViewed);
  const { urls = [], loadingUrls, errorInUrls } = useUrls();
  const { downloadCSV, loading: csvLoading } = useDownloadCSV();

  const userType = localStorage.getItem("userType");

  // Transform the new URL format into the list of strings
  const websiteOptions = React.useMemo(() => {
    if (!urls || loadingUrls) return [];
    return urls.map((urlObj) => ({
      label: urlObj.url
    }));
  }, [urls, loadingUrls]);

  return (
    <>
      <div className={styles.topContainer}>
        <p>Transaction Report History</p>
        <button onClick={downloadCSV} disabled={csvLoading} className={styles.downloadButton}>
          {csvLoading ? "Downloading..." : "Download"}
        </button>
      </div>

      <div className={styles.cardsContainer}>
        <Card heading="Tokens spent" amount={roundNumber(statsData?.tokens_spent)} />
        <Card heading="Remaining Tokens" amount={roundNumber(statsData?.remaining_tokens)} />
        <Card heading="Total sheets connected" amount={statsData?.total_sheets || 0} />
        <Card heading="Templates Generated" amount={statsData?.total_templates || 0} />
      </div>

      <div className={styles.TableSection}>
        <div className={styles.TopUserContainer}>
          {userType === "SUBADMIN" && (
            <TopUsers
              title="Top Performing Users"
              dropdownOptions={dropdownOptionsForUser.map((option) => ({
                ...option,
                onClick: () => option.onClick(setSelectedTimeStamp, setUserTimePeriod),
              }))}
              usersData={topUsersData}
              tableHeaders={tableHeaders}
              buttonText={selectedTimeStamp}
            />
          )}
          <TopUsers
            title="Top Performing Templates"
            dropdownOptions={dropdownOptionsForTemplate.map((option) => ({
              ...option,
              onClick: () => option.onClick(setSelectedTimeStampForTemplate, setTemplateTimePeriod),
            }))}
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
            dropdownOptions={dropdownOptionsForGraph.map((option) => ({
              ...option,
              onClick: () => option.onClick(setSelectedGraphTimeStamp, setGraphTimePeriod),
            }))}
            selectedOption={selectedGraphTimeStamp}
            type="dropdown"
          />
          <Graph
            title="Amount of HVOs/Videos Sent"
            data={hvoVideoData}
            dropdownOptions={dropdownOptionsHvoVideoGraph.map((option) => ({
              ...option,
              onClick: () => option.onClick(setSelectedSentHvoVideoTimestamp, setHvoVideoTimeframe),
            }))}
            selectedOption={selectedSentHvoVideoTimestamp}
            type="filters"
            loading={hvoLoading}
            setIsViewed={setIsViewed}
          />
        </div>

        {userType === "SUBADMIN" && !loadingUrls && websiteOptions.length > 0 && (
          <div className={styles.LeadsGraphContainer}>
            <LeadsGraph timeframeOptions={[{ label: "Monthly" }, { label: "Yearly" }, { label: "Weekly" }]} websiteOptions={websiteOptions} />
          </div>
        )}
      </div>
    </>
  );
};

export default MainDashboard;