import React from "react";
import styles from "./LeadsDashboard.module.scss";
import IdentifiedByMonth from "./TopCards/IdentifiedByMonth/IdentifiedByMonth";
import MonthlySpend from "./TopCards/MonthlySpend/MonthlySpend";
import LatestVisitors from "./TopCards/LatestVisitors/LatestVisitors";
import PieChart from "./TopCards/PieChart/PieChart";
import VisitorsChart from "./MidSection/VisitorsChart/VisitorsChart";
import HorizantolBarChart from "src/Common/HorizantolBarChart/HorizantolBarChart";
import useLeadsDashboard from "./useLeadsDashboard";

const LeadsDashboard = () => {
  const { data, loading } = useLeadsDashboard();

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

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.TopContainer}>
        <IdentifiedByMonth data={identified_by_month} />
        <MonthlySpend data={monthly_data} />
        <LatestVisitors visitors={visitors} />
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
