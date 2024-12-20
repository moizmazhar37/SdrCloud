import React, { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Table from "./Table/Table";
import FullScreenLoader from "../../../../component/FullScreenLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../../../../Common/Dropdown/Dropdown";
import { faArrowLeft, faCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./googlesheets.module.scss";
import { useGoogleSheetsData } from "./hooks";
import WarningModal from "../../../../Common/Modal/Modal";
import axios from "axios";
import ApiConfig from "../../../../config/APIConfig";

function GoogleSheets() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { data, loading, error } = useGoogleSheetsData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // Track selected row for deletion

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRow(null); // Reset the selected row
  };

  const handleDeleteRow = async () => {
    if (!selectedRow) return; // Ensure a row is selected
    setIsLoading(true);
    try {
      const response = await axios({
        url: `${ApiConfig.googleSheet}/${selectedRow.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response?.status === 200) {
        toast.success("Sheet Deleted Successfully.");
        // Optionally refresh the data or remove the row from state
      } else {
        toast.error("Failed to delete the sheet. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the sheet.");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setSelectedRow(null); 
    }
  };

  const handleDelete = (row) => {
    setSelectedRow(row); 
    setIsModalOpen(true); 
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  if (error) return <div>Error Fetching Data. Try reloading!</div>;

  const handleEdit = (row) => {
    console.log("Edit clicked", row.id);
    history.push(`/editSheets/${row.id}`);
  };

  const transformedData =
    data?.map((row) => ({
      ...row,
      title: <span className={styles.titleLink}>{row.title}</span>,
      created_at: new Date(row.created_at)
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "."),
      is_sheet_connected: (
        <div className={styles.connectionStatus}>
          <FontAwesomeIcon
            icon={faCircle}
            className={
              row.is_sheet_connected
                ? styles.connectedDot
                : styles.disconnectedDot
            }
          />
          <span
            className={
              row.is_sheet_connected
                ? styles.connectedText
                : styles.disconnectedText
            }
          >
            {row.is_sheet_connected ? "Connected" : "Disconnected"}
          </span>
        </div>
      ),
      status: <span className={styles.assignedText}>{row.status}</span>,
      actions: (
        <Dropdown
          options={[
            { label: "View", onClick: () => handleEdit(row) },
            { label: "Edit", onClick: () => handleEdit(row) },
            { label: "Delete", onClick: () => handleDelete(row) },
          ]}
          buttonText="Actions"
        />
      ),
    })) || [];

  const columns = [
    { key: "title", label: "Title", clickable: true },
    { key: "fields", label: "Fields" },
    { key: "created_at", label: "Created On" },
    { key: "is_sheet_connected", label: "Connectivity Status" },
    { key: "status", label: "Assigned" },
    { key: "total_records", label: "Total Records" },
    { key: "recent", label: "Recent" },
    { key: "actions", label: "Actions" },
  ];

  const handleColumnClick = (row, columnKey) => {
    history.push(`/editSheets/${row.id}`);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.backNavigators}>
          <FontAwesomeIcon icon={faArrowLeft} color="#0358AC" />
          <div className={styles.navigationText}>
            <p>Settings</p> / <p>Integration</p> /{" "}
            <p style={{ color: "#0358AC" }}>Google Sheet</p>
          </div>
        </div>
        <button>Create New Google Sheet Connection</button>
      </div>
      <Table
        data={transformedData}
        columns={columns}
        onColumnClick={handleColumnClick}
      />
      <WarningModal
        isOpen={isModalOpen}
        onCancel={handleCancel}
        onDelete={handleDeleteRow} 
      />
    </>
  );
}

export default GoogleSheets;
