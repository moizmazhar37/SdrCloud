import React from "react";
import styles from "./LeadsDashboard.module.scss";
import IdentifiedByMonth from "./TopCards/IdentifiedByMonth/IdentifiedByMonth";
import MonthlySpend from "./TopCards/MonthlySpend/MonthlySpend";
import LatestVisitors from "./TopCards/LatestVisitors/LatestVisitors";
import PieChart from "./TopCards/PieChart/PieChart";

const LeadsDashboard = () => {
  const referralData = {
    Direct: 69.2,
    Referral: 30.8,
  };

  // Example of how the component can be reused with different data
  const otherData = {
    "Category A": 45.5,
    "Category B": 54.5,
  };

  return (
    <div className={styles.dashboardContainer}>
      <IdentifiedByMonth />
      <MonthlySpend />
      <LatestVisitors />
      <PieChart title="Direct Vs. Referral" data={referralData} />
    </div>
  );
};

export default LeadsDashboard;
