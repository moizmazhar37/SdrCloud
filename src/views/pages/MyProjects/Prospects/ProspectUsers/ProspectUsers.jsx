import React from "react";
import Table from "src/Common/Table/Table";
import styles from "./Prospectusers.module.scss";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useProspectUserList from "../Hooks/useProspectUserList";


const Prospectusers = ({ templateId, tempType }) => {
  const { data, loading, error } = useProspectUserList(templateId, tempType);

  const headers = [
    { key: "prospect_company", label: "Company" },
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "video_template_url", label: "Video URL" },
  ];

  const transformedData = data?.map(row => ({
    //transforming data to show Link text instead of full url , onlclick open url 
    ...row,
    video_template_url: row.video_template_url ? "Link" : ""
  }));

  const handleFieldClick = (fieldName, rowData) => {
    if (fieldName === "video_template_url" && rowData.video_template_url) {
      // get the original URL from the data before transformation
      const originalRow = data.find(row => 
        row.prospect_company === rowData.prospect_company && 
        row.name === rowData.name
      );
      if (originalRow?.video_template_url) {
        window.open(originalRow.video_template_url, '_blank');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h2>Prospect Users</h2>
      {transformedData && transformedData.length > 0 ? (
        <Table 
          headers={headers} 
          data={transformedData}
          clickableFields={["video_template_url"]}
          onFieldClick={handleFieldClick}
        />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Prospectusers;