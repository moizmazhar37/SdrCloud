import React, { useEffect, useState } from "react";
import styles from "./sheet-details.module.scss";
import Table from "./Table/Table";
import SheetDropdown from "../SheetDropdown/SheetDropdown";
import SheetDropdownTable from "../SheetDropdownTable.jsx/SheetDropdownTable";

const SheetDetails = ({ viewData, type }) => {
  const [tableData, setTableData] = useState(null);
  const [selectedSheetType, setSelectedSheetType] = useState("");
  const [dropdownTableData, setDropdownTableData] = useState([]);

  const truncateUrl = (url) => {
    if (!url) return "N/A";
    if (url.length <= 30) return url;
    return url.substring(0, 30) + "...";
  };

  useEffect(() => {
    if (viewData) {
      console.log("aaaaaaaa==", type)
      const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
          return new Date(dateString).toLocaleString();
        } catch (e) {
          return dateString;
        }
      };

      const formatUrl = (url) => {
        if (!url) return "N/A";
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.urlLink}
            title={url}
          >
            {truncateUrl(url)}
          </a>
        );
      };

      setTableData({
        title: viewData.title || "N/A",
        field_count: viewData.field_count?.toString() || "N/A",
        total_records: viewData.total_records?.toString() || "N/A",
        fetch_url: formatUrl(viewData.fetch_url),
        created_at: formatDate(viewData.created_at),
      });

      setSelectedSheetType(viewData.sheet_type || "");

      // Initialize dropdown table data
      setDropdownTableData([
        {
          id: "customer_id",
          label: "Customer ID",
          dropdown: selectedSheetType,
        },
      ]);
    }
  }, [viewData]);

  const handleSheetTypeChange = (rowIndex, value) => {
    setSelectedSheetType(value);
    setDropdownTableData((prev) =>
      prev.map((row, idx) =>
        idx === rowIndex ? { ...row, dropdown: value } : row
      )
    );
  };

  const mainHeaders = [
    { key: "title", label: "Title" },
    { key: "field_count", label: "Field Count" },
    { key: "total_records", label: "Total Records" },
    { key: "fetch_url", label: "Fetch URL" },
    { key: "created_at", label: "Creation Date" },
  ];

  const dropdownHeaders = ["Field", "Type"];

  if (!tableData) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}></div>
      </div>
    );
  }

  // Props for the SheetDropdown component
  const dropdownProps = {
    options: ["Video", "HVO"],
    label: "Sheet Type",
    disabled: false,
    selectedValue: { type }
  };

  return (
    <div className={styles.sheetDetailsContainer}>
      <Table
        heading="Sheet Details"
        headers={mainHeaders}
        data={tableData}
        canEdit={false}
        onSave={() => { }}
      />

      <SheetDropdownTable
        title="Sheet Configuration"
        edit={false}
        headers={dropdownHeaders}
        rows={dropdownTableData}
        SheetDropdownComponent={SheetDropdown}
        dropdownProps={{
          ...dropdownProps,
          selectedValue: selectedSheetType,  // Ensure the dropdown reflects the selected sheet type
          onSelect: handleSheetTypeChange,
        }}
      />

    </div>
  );
};

export default SheetDetails;
