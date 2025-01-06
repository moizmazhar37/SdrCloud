import React, { useState, useEffect } from "react";
import Card from "./CardBlock/Card";
import TopUsers from "./TableCardBlock/TabularCard";
import Graph from "./Graph/Graph";
import useUserCounts from "./Hooks/useUserStats";
import useGraphData from "./Hooks/useTemplateCounts";
import useTopUsers from "./Hooks/useTopUsers";
import useTopTemplates from "./Hooks/useTopTemplates";
import useDownloadCSV from "./Hooks/useDownloadCSV";
import useHvoVideoSent from "./Hooks/useHvoVideoSent";
import styles from "./MainDashboard.module.scss";

const MainDashboard = () => {
  const [selectedTimeStamp, setSelectedTimeStamp] = useState("Current Month");
  const [selectedGraphTimeStamp, setSelectedGraphTimeStamp] =
    useState("Monthly");
  const [selectedTimeStampForTemplate, setSelectedTimeStampForTemplate] =
    useState("Current Month");
  const [selectedSentHvoVideoTimestamp, setSelectedSentHvoVideoTimestamp] =
    useState("Current Month");
  const [hvoVideoTimeframe, setHvoVideoTimeframe] = useState("month");
  const [isViewed, setIsViewed] = useState(false);
  const [userTimePeriod, setUserTimePeriod] = useState("month");
  const [templateTimePeriod, setTemplateTimePeriod] = useState("month");
  const [graphTimePeriod, setGraphTimePeriod] = useState("month");

  const { statsData, isStatsloading, statsError } = useUserCounts();
  const { GraphData } = useGraphData(graphTimePeriod);
  const { topUsersData } = useTopUsers(userTimePeriod);
  const { toptemplatesData } = useTopTemplates(templateTimePeriod);
  const { hvoVideoData, loading: hvoLoading } = useHvoVideoSent(
    hvoVideoTimeframe,
    isViewed
  );
  const { downloadCSV, loading: csvLoading } = useDownloadCSV();

  const truncateNumber = (num, decimals = 5) => {
    if (num === undefined || num === null) return "0";
    const str = num.toString();
    const dotIndex = str.indexOf(".");
    if (dotIndex === -1) return str;
    const truncated = '$' + str.slice(0, dotIndex + decimals + 1);
    return truncated.length < str.length ? `${truncated}...` : truncated;
  };

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

  const dropdownOptionsHvoVideoGraph = [
    {
      label: "Current Month",
      onClick: () => {
        setSelectedSentHvoVideoTimestamp("Current Month");
        setHvoVideoTimeframe("month");
      },
    },
    {
      label: "Current Year",
      onClick: () => {
        setSelectedSentHvoVideoTimestamp("Current Year");
        setHvoVideoTimeframe("year");
      },
    },
    {
      label: "Current Week",
      onClick: () => {
        setSelectedSentHvoVideoTimestamp("Current Week");
        setHvoVideoTimeframe("week");
      },
    },
  ];

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

  const dropdownOptionsForTemplate = [
    {
      label: "Current Month",
      onClick: () => {
        setSelectedTimeStampForTemplate("Current Month");
        setTemplateTimePeriod("month");
      },
    },
    {
      label: "Current  Year",
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

  return (
    <>
      <div className={styles.topContainer}>
        <p>Transaction Report History</p>
        <button onClick={downloadCSV} disabled={csvLoading}>
          {csvLoading ? "Downloading..." : "Download"}
        </button>
      </div>
      <div className={styles.cardsContainer}>
        <Card
          heading={"Tokens spent"}
         // growthText={"Monthly growth"}
          label={"New"}
          amount={truncateNumber(statsData.tokens_spent)}
          labelType="new"
        />
        <Card
          heading={"Remaining Tokens"}
        //  growthText={"Monthly growth"}
          label={"global"}
          amount={truncateNumber(statsData.remaining_tokens)}
          labelType="global"
        />
        <Card
          heading={"Total sheets connected"}
         // growthText={"Monthly growth"}
          label={"intuitive"}
          amount={statsData.total_sheets}
          labelType="intuitive"
        />
        <Card
          heading={"Templates Generated"}
        //  growthText={"Monthly growth"}
          label={"intuitive"}
          labelType="intuitive"
          amount={statsData.total_templates}
        />
      </div>
      <div className={styles.TableSection}>
        <div className={styles.TopUserContainer}>
          <TopUsers
            title={"Top Performing Users"}
            dropdownOptions={dropdownOptionsForUser}
            usersData={topUsersData}
            tableHeaders={tableHeaders}
            buttonText={selectedTimeStamp}
          />
          <TopUsers
            title={"Top Performing Templates"}
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
      </div>
    </>
  );
};

export default MainDashboard;
