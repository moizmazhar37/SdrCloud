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
import LeadsGraph from "./LeadsGraph/LeadsGraph";

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

  const roundNumber = (num, decimals = 2) => {
    if (num === undefined || num === null) return "$0.00";
    const factor = Math.pow(10, decimals);
    const rounded = (Math.round(num * factor) / factor).toFixed(decimals);
    return `$${rounded}`;
  };
  

  const userType=localStorage.getItem('userType')
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

  //------------------dummy data for leads graph-----------------------

  const graphData = [
    { month: "Apr", lead: 400 },
    { month: "May", lead: 250 },
    { month: "Jun", lead: 600 },
    { month: "Jul", lead: 800 },
    { month: "Aug", lead: 150 },
    { month: "Sep", lead: 1000 },
    { month: "Oct", lead: 800 },
    { month: "Nov", lead: 350 },
    { month: "Dec", lead: 700 },
    { month: "Jan", lead: 500 },
    { month: "Feb", lead: 300 },
    { month: "Mar", lead: 900 },
  ];

  const timeframeOptions = [
    { label: "Monthly", onClick: () => console.log("Monthly selected") },
    { label: "Yearly", onClick: () => console.log("Yearly selected") },
    { label: "Weekly", onClick: () => console.log("Weekly selected") },
  ];

  const websiteOptions = [
    { label: "www.google.com", onClick: () => console.log("Google selected") },
    {
      label: "wwww.facebook.com",
      onClick: () => console.log("Facebook selected"),
    },
    { label: "www.google.com", onClick: () => console.log("Google selected") },
  ];

  //-------------------------------------------------------------------
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
          //  label={"New"}
          amount={roundNumber(statsData.tokens_spent)}
          //  labelType="new"
        />
        <Card
          heading={"Remaining Tokens"}
          //  growthText={"Monthly growth"}
          //  label={"global"}
          amount={roundNumber(statsData.remaining_tokens)}
          //  labelType="global"
        />
        <Card
          heading={"Total sheets connected"}
          // growthText={"Monthly growth"}
          //  label={"intuitive"}
          amount={statsData.total_sheets}
          //  labelType="intuitive"
        />
        <Card
          heading={"Templates Generated"}
          //  growthText={"Monthly growth"}
          //  label={"intuitive"}
          //  labelType="intuitive"
          amount={statsData.total_templates}
        />
      </div>
      <div className={styles.TableSection}>
        <div className={styles.TopUserContainer}>
        {userType == "SUBADMIN" && (
          
          <TopUsers
            title={"Top Performing Users"}
            dropdownOptions={dropdownOptionsForUser}
            usersData={topUsersData}
            tableHeaders={tableHeaders}
            buttonText={selectedTimeStamp}
          />)}
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

        {userType == "SUBADMIN" && (
          <div className={styles.LeadsGraphContainer}>
            <LeadsGraph
              data={graphData}
              timeframeOptions={timeframeOptions}
              websiteOptions={websiteOptions}
            />{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default MainDashboard;
