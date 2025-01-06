import React from "react";
import Table from "src/views/pages/settings/GoogleSheets/Table/Table";
import styles from "./Prospectusers.module.scss";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useProspectUserList from "../Hooks/useProspectUserList";

const Prospectusers = ({ templateId, tempType }) => {
  const { data, loading, error } = useProspectUserList(templateId, tempType);

  const videoHeaders = [
    { key: "prospect_company", label: "Company" },
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "video_template_url", label: "Video URL" },
  ];

  const hvoHeaders = [
    { key: "prospect_company", label: "Company" },
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "hvo_url", label: "HVO URL" },
  ];

  const transformedData = data?.map(row => ({
    ...row,
    [tempType === 'hvo' ? 'hvo_url' : 'video_template_url']: 
      row[tempType === 'hvo' ? 'hvo_url' : 'video_template_url'] ? "Link" : ""
  }));

  const handleFieldClick = (fieldName, rowData) => {
    const urlField = tempType === 'hvo' ? 'hvo_url' : 'video_template_url';
    if (fieldName === urlField && rowData[fieldName]) {
      const originalRow = data.find(row => 
        row.prospect_company === rowData.prospect_company && 
        row.name === rowData.name
      );
      if (originalRow?.[urlField]) {
        window.open(originalRow[urlField], '_blank');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  const headers = tempType === 'hvo' ? hvoHeaders : videoHeaders;
  const clickableFields = tempType === 'hvo' ? ['hvo_url'] : ['video_template_url'];

  return (
    <div className={styles.container}>
      <h2>Prospect Users</h2>
      {transformedData && transformedData.length > 0 ? (
        <Table 
          headers={headers} 
          data={transformedData}
          clickableFields={clickableFields}
          onFieldClick={handleFieldClick}
        />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Prospectusers;