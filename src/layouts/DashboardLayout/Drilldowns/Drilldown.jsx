import React from "react";
import { useLocation } from "react-router-dom";
import Table from "src/Common/Table/Table";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useGetDrilldownScreensData from "src/views/pages/EmailSettings/EmailSetupSections/Hooks/useGetDrilldownScreensData";
import Loader from "src/Common/Loader/Loader";
import styles from "./Drilldown.module.scss";

const Drilldown = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const heading = searchParams.get("heading");

  const navigationItems = [
    { text: "Dashboard", route: "/dashboard" },
    { text: "Data Details", route: "/drilldown" },
  ];

  const {
    data: drilldownData,
    loading: drilldownLoading,
    error: drilldownError,
  } = useGetDrilldownScreensData(heading);

  if (drilldownLoading) {
    return (
      <div className={styles.drilldownContainer}>
        <div className={styles.loader}>
          <Loader size={160} />
        </div>
      </div>
    );
  }

  // Prepare table data
  const prepareTableData = (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.map((item, index) => {
      const processedItem = { id: index + 1 };

      // Replace null, undefined, empty string values with "NA"
      Object.keys(item).forEach((key) => {
        const value = item[key];
        if (
          value === null ||
          value === undefined ||
          value === "" ||
          value === "null"
        ) {
          processedItem[key] = "NA";
        } else {
          processedItem[key] = value;
        }
      });

      return processedItem;
    });
  };

  // Prepare table headers
  const prepareTableHeaders = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    const firstItem = data[0];
    return Object.keys(firstItem).map((key) => ({
      key: key,
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
    }));
  };

  const tableData = prepareTableData(drilldownData);
  const tableHeaders = prepareTableHeaders(drilldownData);

  // Default headers for empty state
  const defaultHeaders = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
  ];

  // Error data for table
  const errorData = [
    {
      id: 1,
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
