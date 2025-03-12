import React, { useState } from "react";
import Table from "../../../../Common/Table/Table";
import useProspects from "./Hooks/useProspects";
import styles from "./Prospects.module.scss";
import Prospectusers from "./ProspectUsers/ProspectUsers";

const Prospects = () => {
  const [activeView, setActiveView] = useState("video");
  const [showProspectUsers, setShowProspectUsers] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
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
    if (fieldName === "action" && rowData?.templateId) {
      setSelectedRowData({
        templateId: rowData.templateId,
        tempType: activeView,
      });
      setShowProspectUsers(true);
    }
  };

  if (showProspectUsers) {
    return (
      <Prospectusers
        templateId={selectedRowData.templateId}
        tempType={selectedRowData.tempType}
      />
    );
  }
  return (
    <div className={styles.name}>
      <div className={styles.toggleButtons}>
        <button
          onClick={() => setActiveView("video")}
          className={`${styles.toggleButton} ${
            activeView === "video" ? styles.active : styles.inactive
          }`}
        >
          Video
        </button>
        <button
          onClick={() => setActiveView("hvo")}
          className={`${styles.toggleButton} ${
            activeView === "hvo" ? styles.active : styles.inactive
          }`}
        >
          HVO
        </button>
      </div>

      {activeView === "video" && (
        <>
          <Table
            headers={headers}
            data={videoData}
            clickableFields={clickableFields}
            onFieldClick={handleFieldClick}
          />
        </>
      )}

      {activeView === "hvo" && (
        <>
          <Table
            headers={headers}
            data={hvoData}
            clickableFields={clickableFields}
            onFieldClick={handleFieldClick}
          />
        </>
      )}
    </div>
  );
};

export default Prospects;
