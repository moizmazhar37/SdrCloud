import React from "react";
import styles from "./LeadsDashboard.module.scss";
import IdentifiedByMonth from "./TopCards/IdentifiedByMonth/IdentifiedByMonth";
import MonthlySpend from "./TopCards/MonthlySpend/MonthlySpend";
import LatestVisitors from "./TopCards/LatestVisitors/LatestVisitors";
import PieChart from "./TopCards/PieChart/PieChart";
import Map from "./MidSection/Map/Map";
import VisitorsChart from "./MidSection/VisitorsChart/VisitorsChart";
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

  const locations = [
    { lat: 40.7128, lng: -74.006, visits: 3 }, // New York
    { lat: 34.0522, lng: -118.2437, visits: 3 }, // Los Angeles
    { lat: 41.8781, lng: -87.6298, visits: 2 }, // Chicago
    { lat: 42.3601, lng: -71.0589, visits: 2 }, // Boston
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
        <Map locations={locations} />
        <VisitorsChart />
      </div>
    </div>
  );
};

export default LeadsDashboard;
