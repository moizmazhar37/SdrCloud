import React, { useState } from "react";
import useGetTenantDashboardSDRC from "./LandingPage/Hooks/useGetTenantDashboardSDRC";
import AdminDashboard from "../DashboardAdmin/AdminDashboard/AdminDashboard";
import Loader from "src/Common/Loader/Loader";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
const SdrcDashboardWrapper = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { data, loading, error } = useGetTenantDashboardSDRC(
    dateRange.startDate,
    dateRange.endDate
  );

  const handleDateRangeChange = (newDateRange) => {
    console.log("SDRC Date range updated:", newDateRange);
    setDateRange(newDateRange);
  };
  const navigationItems = [
    { text: "Select Company", route: "/SDRC-dashboard" },
    { text: "Tenant Insights", route: "/sdrc-tenant-insights" },
  ];

  if (loading)
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          backgroundColor: "#fff", // optional
        }}
      >
        <Loader size={160} />
      </div>
    );

  return (
    <div>
      <h2>SDRC Dashboard</h2>
      <DynamicNavigator items={navigationItems} />
      <AdminDashboard
        externalData={data}
        onDateRangeChange={handleDateRangeChange}
        initialDateRange={dateRange}
      />
    </div>
  );
};

export default SdrcDashboardWrapper;
