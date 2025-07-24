import React from "react";
import { useLocation } from "react-router-dom";
import Table from "src/Common/Table/Table";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useGetDrilldownScreensData from "src/views/pages/EmailSettings/EmailSetupSections/Hooks/useGetDrilldownScreensData";
import Loader from "src/Common/Loader/Loader";
import { prepareTableData, prepareTableHeaders, formatDateTime } from "./helpers";
import styles from "./Drilldown.module.scss";

const Drilldown = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const heading = searchParams.get("heading");
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  const navigationItems = [
    { text: "Dashboard", route: "/dashboard" },
    { text: "Data Details", route: "/drilldown" },
  ];

  const {
    data: drilldownData,
    loading: drilldownLoading,
    error: drilldownError,
  } = useGetDrilldownScreensData(heading, startDate, endDate);

  if (drilldownLoading) {
    return (
      <div className={styles.drilldownContainer}>
        <div className={styles.loader}>
          <Loader size={160} />
        </div>
      </div>
    );
  }


  const tableData = prepareTableData(drilldownData, heading);
  const tableHeaders = prepareTableHeaders(tableData, drilldownData, heading);

  // Default headers for empty state (without id column)
  const defaultHeaders = [
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
  ];

  // Error data for table
  const errorData = [
    {
      name: "Error",
      status: drilldownError?.message || "Failed to load data",
      date: new Date().toLocaleDateString(),
    },
  ];

  return (
    <>
      <DynamicNavigator items={navigationItems} />
      <div className={styles.drilldownContainer}>
        <div className={styles.content}>
          <div className={styles.headingCard}>
            <h2 className={styles.heading}>
              Detailed Data for {heading || "Unknown"}
            </h2>
            <p className={styles.subHeading}>
              Comprehensive view of all related information
            </p>
          </div>

          {drilldownError ? (
            <Table
              data={errorData}
              headers={defaultHeaders}
              title={`Error Loading ${heading} Details`}
              showDropdown={false}
            />
          ) : tableData.length > 0 ? (
            <Table
              data={tableData}
              headers={tableHeaders}
              title={`${heading} Details`}
              showDropdown={false}
            />
          ) : (
            <Table
              data={[]}
              headers={defaultHeaders}
              title={`${heading} Details`}
              showDropdown={false}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Drilldown;
