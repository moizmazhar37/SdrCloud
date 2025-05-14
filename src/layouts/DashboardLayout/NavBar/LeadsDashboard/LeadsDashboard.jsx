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
import {
  handlePieChartSegmentClick,
  handleViewAllVisitors,
  handleBarChartRowClick,
  getCurrentMonthDateRange,
  EMPTY_RESPONSE,
} from "./helpers";

const LeadsDashboard = () => {
  const { data: apiData, loading, error } = useLeadsDashboard();
  const data = error ? EMPTY_RESPONSE : apiData;
  const [showSearchLeads, setShowSearchLeads] = useState(false);
  const [searchFilters, setSearchFilters] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  if (loading) {
    return <p>{""}</p>;
  }

  const visitors_data = data.visitor_trends;
  const visitors = data.visitors;

  // Transform income data to remove commas from net worth values while preserving $ signs
  const incomeData = data.income_data.map((item) => {
    if (typeof item.label === "string" && item.label.includes(",")) {
      return {
        ...item,
        label: item.label.replace(/(\$[0-9]*),([0-9]*)/g, "$1$2"),
      };
    }
    return item;
  });

  const ageData = data.age_data;
  const locationData = data.location_data;
  const identified_by_month = data?.identified_by_month || [];
  const monthly_data = data?.monthly_spend || [];
  const referralData = data.direct_vs_referral;
  const genderData = {
    Male: data.gender_data.Male,
    Female: data.gender_data.Female,
  };

  // Handle click on the IdentifiedByMonth component
  const handleIdentifiedByMonthClick = () => {
    const dateRange = getCurrentMonthDateRange();
    setSearchFilters(dateRange);
    setShowSearchLeads(true);
  };

  // Handle bar click on VisitorsChart
  const handleVisitorBarClick = (date) => {
    const dateFilter = {
      startDate: date,
      endDate: date,
    };
    setSearchFilters(dateFilter);
    setShowSearchLeads(true);
  };

  // Handle click on individual visitor eye button
  const handleVisitorEyeClick = (visitor) => {
    // Example of extracting first name, adjust based on your actual data structure
    const firstName = visitor.name;
    setSelectedVisitor({ firstName });
    setShowSearchLeads(true);
  };

  // If SearchLeads is shown, render it
  if (showSearchLeads) {
    return (
      <SearchLeads
        isFromDashboard={true}
        initialFilters={searchFilters || selectedVisitor}
      />
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.TopContainer}>
        <IdentifiedByMonth
          data={identified_by_month}
          onClick={handleIdentifiedByMonthClick}
        />
        <MonthlySpend data={monthly_data} />
        <LatestVisitors
          visitors={visitors}
          onViewAll={() =>
            handleViewAllVisitors(setShowSearchLeads, setSearchFilters)
          }
          onVisitorEyeClick={handleVisitorEyeClick}
        />
        <PieChart
          title="Direct Vs. Referral"
          data={referralData}
          clickable={true}
          onSegmentClick={(segmentName) =>
            handlePieChartSegmentClick(
              "Direct Vs. Referral",
              segmentName,
              setShowSearchLeads,
              setSearchFilters
            )
          }
        />
      </div>
      <div className={styles.midContainer}>
        <VisitorsChart
          data={visitors_data}
          onBarClick={handleVisitorBarClick}
        />
      </div>
      <div className={styles.TopContainer}>
        <PieChart
          title="Gender"
          data={genderData}
          clickable={true}
          onSegmentClick={(segmentName) =>
            handlePieChartSegmentClick(
              "Gender",
              segmentName,
              setShowSearchLeads,
              setSearchFilters
            )
          }
        />
        <HorizantolBarChart
          data={incomeData}
          title="Income Level"
          chartType="income"
          onRowClick={(chartType, rowLabel) =>
            handleBarChartRowClick(
              chartType,
              rowLabel,
              setShowSearchLeads,
              setSearchFilters
            )
          }
          formatValues={false}
        />
        <HorizantolBarChart
          data={ageData}
          title="Age Range"
          chartType="age"
          onRowClick={(chartType, rowLabel) =>
            handleBarChartRowClick(
              chartType,
              rowLabel,
              setShowSearchLeads,
              setSearchFilters
            )
          }
        />
        <HorizantolBarChart
          data={locationData}
          title="Location"
          chartType="location"
          onRowClick={(chartType, rowLabel) =>
            handleBarChartRowClick(
              chartType,
              rowLabel,
              setShowSearchLeads,
              setSearchFilters
            )
          }
        />
      </div>
    </div>
  );
};

export default LeadsDashboard;
