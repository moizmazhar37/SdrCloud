import React from "react";
import Table from "src/Common/Table/Table";
import useProspects from "./Hooks/useProspects";
import styles from "./Prospects.module.scss";

const Prospects = () => {
  const { getTransformedData, loading } = useProspects();
  const headers = [
    { key: "templateName", label: "Template Name" },
    { key: "sheetName", label: "Sheet Name" },
    { key: "user", label: "User" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const { videoData, hvoData } = getTransformedData();

  const clickableFields = ["action"];

  const handleFieldClick = (fieldName, rowData) => {
    console.log(`Clicked ${fieldName}:`, rowData);
  };

  return (
    <div className={styles.name}>
      <h2>Video Templates</h2>
      <Table
        headers={headers}
        data={videoData}
        clickableFields={clickableFields}
        onFieldClick={handleFieldClick}
      />
      <h2>HVO Templates</h2>
      <Table
        headers={headers}
        data={hvoData}
        clickableFields={clickableFields}
        onFieldClick={handleFieldClick}
      />
    </div>
  );
};

export default Prospects;
