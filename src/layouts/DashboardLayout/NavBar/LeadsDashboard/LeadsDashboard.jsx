// LeadsDashboard.jsx
import React from "react";
import styles from "./LeadsDashboard.module.scss";
import IdentifiedByMonth from "./TopCards/IdentifiedByMonth/IdentifiedByMonth";
import MonthlySpend from "./TopCards/MonthlySpend/MonthlySpend";
import LatestVisitors from "./TopCards/LatestVisitors/LatestVisitors";
import PieChart from "./TopCards/PieChart/PieChart";
import VisitorsChart from "./MidSection/VisitorsChart/VisitorsChart";
import HorizantolBarChart from "src/Common/HorizantolBarChart/HorizantolBarChart";

const LeadsDashboard = () => {
  const referralData = {
    Direct: 69.2,
    Referral: 30.8,
  };

  const genderData = {
    Male: 69.2,
    Female: 30.8,
  };

  const incomeData = [
    { label: "$20,000 to $44,999", value: 5 },
    { label: "$45,000 to $59,999", value: 2 },
    { label: "$120,000 to $149,999", value: 7 },
    { label: "$150,000 to $199,999", value: 1 },
    { label: "$250,000+", value: 3 },
    { label: "Other", value: 1 },
  ];

  const ageData = [
    { label: "25-34", value: 2 },
    { label: "35-44", value: 1 },
    { label: "45-54", value: 3 },
    { label: "55-64", value: 7 },
    { label: "65 and older", value: 6 },
  ];

  const locationData = [
    { label: "FL", value: 4 },
    { label: "MD", value: 3 },
    { label: "CA", value: 3 },
    { label: "PA", value: 2 },
    { label: "MI", value: 1 },
    { label: "Other", value: 11 },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.TopContainer}>
        <IdentifiedByMonth />
        <MonthlySpend />
        <LatestVisitors />
        <PieChart title="Direct Vs. Referral" data={referralData} />
      </div>
      <div className={styles.midContainer}>
        <VisitorsChart />
      </div>
      <div className={styles.TopContainer}>
        <PieChart title="Gender" data={genderData} />
        <HorizantolBarChart data={incomeData} title="Income Level" />
        <HorizantolBarChart data={ageData} title="Age Range" />
        <HorizantolBarChart data={locationData} title="Location" />
      </div>
    </div>
  );
};

export default LeadsDashboard;
