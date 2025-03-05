import React, { useState } from "react";
import styles from "./LeadsDashboard.module.scss";
import IdentifiedByMonth from "./TopCards/IdentifiedByMonth/IdentifiedByMonth";
import MonthlySpend from "./TopCards/MonthlySpend/MonthlySpend";
import LatestVisitors from "./TopCards/LatestVisitors/LatestVisitors";
import PieChart from "./TopCards/PieChart/PieChart";
import VisitorsChart from "./MidSection/VisitorsChart/VisitorsChart";
import HorizantolBarChart from "src/Common/HorizantolBarChart/HorizantolBarChart";
import SearchLeads from "../SearchLeads/SearchLeads";
import useLeadsDashboard from "./useLeadsDashboard";

const LeadsDashboard = () => {
  const { data, loading } = useLeadsDashboard();
  const [showSearchLeads, setShowSearchLeads] = useState(false);
  const [searchFilters, setSearchFilters] = useState(null);

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

  // Handler for segment clicks on pie charts
  const handlePieChartSegmentClick = (chartTitle, segmentName) => {
    let filterKey = "";
    let filterValue = segmentName;

    switch (chartTitle) {
      case "Gender":
        filterKey = "gender";
        break;
      case "Direct Vs. Referral":
        filterKey = "referralSource";
        break;
      default:
        return;
    }

    const initialFilters = {
      [filterKey]: filterValue,
    };

    setSearchFilters(initialFilters);
    setShowSearchLeads(true);
  };

  // Handler for "View all" in LatestVisitors
  const handleViewAllVisitors = () => {
    setSearchFilters(null);
    setShowSearchLeads(true);
  };

  // Handler for HorizontalBarChart row clicks
  const handleBarChartRowClick = (chartType, rowLabel) => {
    let filterKey = "";
    let filterValue = rowLabel;

    switch (chartType) {
      case "income":
        filterKey = "netWorth";
        break;
      case "age":
        filterKey = "age";
        break;
      case "location":
        filterKey = "state";
        break;
      default:
        return;
    }

    const initialFilters = {
      [filterKey]: filterValue,
    };

    setSearchFilters(initialFilters);
    setShowSearchLeads(true);
  };

  // If SearchLeads is shown, render it
  if (showSearchLeads) {
    return (
      <SearchLeads isFromDashboard={true} initialFilters={searchFilters} />
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.TopContainer}>
        <IdentifiedByMonth data={identified_by_month} />
        <MonthlySpend data={monthly_data} />
        <LatestVisitors visitors={visitors} onViewAll={handleViewAllVisitors} />
        <PieChart
          title="Direct Vs. Referral"
          data={referralData}
          clickable={true}
          onSegmentClick={(segmentName) =>
            handlePieChartSegmentClick("Direct Vs. Referral", segmentName)
          }
        />
      </div>
      <div className={styles.midContainer}>
        <VisitorsChart data={visitors_data} />
      </div>
      <div className={styles.TopContainer}>
        <PieChart
          title="Gender"
          data={genderData}
          clickable={true}
          onSegmentClick={(segmentName) =>
            handlePieChartSegmentClick("Gender", segmentName)
          }
        />
        <HorizantolBarChart
          data={incomeData}
          title="Income Level"
          chartType="income"
          onRowClick={handleBarChartRowClick}
        />
        <HorizantolBarChart
          data={ageData}
          title="Age Range"
          chartType="age"
          onRowClick={handleBarChartRowClick}
        />
        <HorizantolBarChart
          data={locationData}
          title="Location"
          chartType="location"
          onRowClick={handleBarChartRowClick}
        />
      </div>
    </div>
  );
};

export default LeadsDashboard;
