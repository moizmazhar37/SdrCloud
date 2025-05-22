import React, { useState } from "react";
import useGetTenantDashboardSDRC from "./LandingPage/Hooks/useGetTenantDashboardSDRC";
import AdminDashboard from "../DashboardAdmin/AdminDashboard/AdminDashboard";
import Loader from "src/Common/Loader/Loader";
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

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader size={160} />
      </div>
    );

  if (error) {
    return <div>Error loading SDRC Dashboard: {error.message}</div>;
  }

  return (
    <div>
      <h2>SDRC Dashboard</h2>
      <AdminDashboard
        externalData={data}
        onDateRangeChange={handleDateRangeChange}
        initialDateRange={dateRange}
      />
    </div>
  );
};

export default SdrcDashboardWrapper;
