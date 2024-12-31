import React, { useState } from "react";
import Card from "./CardBlock/Card";
import TopUsers from "./TableCardBlock/TabularCard";
import Graph from "./Graph/Graph";
import useUserCounts from "./Hooks/useUserStats";
import useGraphData from "./Hooks/useTemplateCounts";
import useTopUsers from "./Hooks/useTopUsers";
import useTopTemplates from "./Hooks/useTopTemplates";
import useDownloadCSV from "./Hooks/useDownloadCSV";
import FiltersDropdown from "src/Common/FiltersDropdown/FiltersDropdown";
import styles from "./MainDashboard.module.scss";

const MainDashboard = () => {
  const [selectedTimeStamp, setSelectedTimeStamp] = useState("Monthly");
  const [selectedGraphTimeStamp, setSelectedGraphTimeStamp] = useState("Monthly");
  const [selectedTimeStampForTemplate, setSelectedTimeStampForTemplate] = useState("Monthly");
  
  const [userTimePeriod, setUserTimePeriod] = useState("month");
  const [templateTimePeriod, setTemplateTimePeriod] = useState("month");
  const [graphTimePeriod, setGraphTimePeriod] = useState("month");

  const { isStatsloading, statsError, statsData } = useUserCounts();
  const { GraphData } = useGraphData(graphTimePeriod);
  const { topUsersData } = useTopUsers(userTimePeriod);
  const { toptemplatesData } = useTopTemplates(templateTimePeriod);
  const { downloadCSV, loading } = useDownloadCSV();

  const truncateNumber = (num, decimals = 5) => {
    if (num === undefined || num === null) return "0";
    const str = num.toString();
    const dotIndex = str.indexOf(".");
    if (dotIndex === -1) return str;
    const truncated = str.slice(0, dotIndex + decimals + 1);
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

  const dropdownOptionsForUser = [
    {
      label: "Monthly",
      onClick: () => {
        setSelectedTimeStamp("Monthly");
        setUserTimePeriod("month");
      },
    },
    {
      label: "Yearly",
      onClick: () => {
        setSelectedTimeStamp("Yearly");
        setUserTimePeriod("year");
      },
    },
    {
      label: "Weekly",
      onClick: () => {
        setSelectedTimeStamp("Weekly");
        setUserTimePeriod("week");
      },
    },
  ];

  const dropdownOptionsForTemplate = [
    {
      label: "Monthly",
      onClick: () => {
        setSelectedTimeStampForTemplate("Monthly");
        setTemplateTimePeriod("month");
      },
    },
    {
      label: "Yearly",
      onClick: () => {
        setSelectedTimeStampForTemplate("Yearly");
        setTemplateTimePeriod("year");
      },
    },
    {
      label: "Weekly",
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
    { key: "viewed_count", label: "Times Used" },
  ];

  return (
    <>
      <div className={styles.topContainer}>
        <p>Transaction Report History</p>
        <button onClick={downloadCSV} disabled={loading}>
          {loading ? "Downloading..." : "Download"}
        </button>
      </div>
      <div className={styles.cardsContainer}>
        <Card
          heading={"Tokens spent"}
          growthText={"Monthly growth"}
          label={"New"}
          amount={truncateNumber(statsData.tokens_spent)}
          labelType="new"
        />
        <Card
          heading={"Remaining Tokens"}
          growthText={"Monthly growth"}
          label={"global"}
          amount={truncateNumber(statsData.remaining_tokens)}
          labelType="global"
        />
        <Card
          heading={"Total sheets connected"}
          growthText={"Monthly growth"}
          label={"intuitive"}
          amount={statsData.total_sheets}
          labelType="intuitive"
        />
        <Card
          heading={"Templates Generated"}
          growthText={"Monthly growth"}
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
          />
          <Graph
            title="Amount of Templates Created"
            data={GraphData}
            dropdownOptions={dropdownOptionsForGraph}
            selectedOption={selectedGraphTimeStamp}
          />
        </div>
      </div>
    </>
  );
};

export default MainDashboard;