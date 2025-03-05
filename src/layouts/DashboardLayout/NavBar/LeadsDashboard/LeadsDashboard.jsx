import React, { useState } from "react";
import styles from "./LeadsDashboard.module.scss";
import IdentifiedByMonth from "./TopCards/IdentifiedByMonth/IdentifiedByMonth";
import MonthlySpend from "./TopCards/MonthlySpend/MonthlySpend";
import LatestVisitors from "./TopCards/LatestVisitors/LatestVisitors";
import PieChart from "./TopCards/PieChart/PieChart";
import VisitorsChart from "./MidSection/VisitorsChart/VisitorsChart";
import HorizantolBarChart from "src/Common/HorizantolBarChart/HorizantolBarChart";
import SearchLeads from "../SearchLeads/SearchLeads"; // Import SearchLeads
import useLeadsDashboard from "./useLeadsDashboard";

const LeadsDashboard = () => {
  const { data, loading } = useLeadsDashboard();
  const [showSearchLeads, setShowSearchLeads] = useState(false);

  if (loading) {
    return <p>{""}</p>;
  }

  const visitors_data = data.visitor_trends;
  const visitors = data.visitors;
  const incomeData = data.income_data;
  const ageData = data.age_data;
  const locationData = data.location_data;
  const identified_by_month = data?.identified_by_month || [];
  const monthly_data = data?.monthly_spend || [];
  const referralData = data.direct_vs_referral;

  const genderData = {
    Male: 69.2,
    Female: 30.8,
  };

  // Create initial filters based on dashboard data
  const initialFilters = {
    dateRange: {
      start: "", // You might want to set a default start date
      end: "", // You might want to set a default end date
    },
    // Add other filter criteria if needed
  };

  // Handler for "View all" in LatestVisitors
  const handleViewAllVisitors = () => {
    setShowSearchLeads(true);
  };

  // If SearchLeads is shown, render it
  if (showSearchLeads) {
    return (
      <SearchLeads isFromDashboard={true} initialFilters={initialFilters} />
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.TopContainer}>
        <IdentifiedByMonth data={identified_by_month} />
        <MonthlySpend data={monthly_data} />
        <LatestVisitors
          visitors={visitors}
          onViewAll={handleViewAllVisitors} // Pass handler
        />
        <PieChart title="Direct Vs. Referral" data={referralData} />
      </div>
      <div className={styles.midContainer}>
        <VisitorsChart data={visitors_data} />
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
