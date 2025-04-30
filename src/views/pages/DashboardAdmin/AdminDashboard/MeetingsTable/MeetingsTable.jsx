import React, { useState, useEffect } from "react";
import Table from "src/Common/Table/Table";
import Dropdown from "src/Common/Dropdown/Dropdown";
import Loader from "src/Common/Loader/Loader";
import styles from "./MeetingsTable.module.scss";
import useGetAllMeetings from "src/views/pages/settings/EmailScheduling/Hooks/useGetAllMeetings";
import useUpdateMeetingStatus from "src/views/pages/settings/BookedMeetings/Hooks/useUpdateMeetingStatus";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MeetingsTable = () => {
  const { data, loading, error, refetch } = useGetAllMeetings();
  const {
    updateStatus,
    loading: updateLoading,
    error: updateError,
    success,
  } = useUpdateMeetingStatus();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [meetings, setMeetings] = useState([]);

  // Show toast notifications for update errors
  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
    }
  }, [updateError]);

  // Show toast notifications for update success
  useEffect(() => {
    if (success) {
      toast.success("Meeting status updated successfully");
    }
  }, [success]);

  // Update meetings state when API data is loaded
  useEffect(() => {
    if (data && data.meetings) {
      // Transform API data to the format needed for the table
      const transformedMeetings = data.meetings.map((meeting) => {
        // Parse dates from ISO string to more readable formats
        const startDate = new Date(meeting.start_time);
        const endDate = new Date(meeting.end_time);
        const formattedStartDate = startDate.toLocaleString();
        const formattedEndDate = endDate.toLocaleString();

        return {
          id: meeting.meeting_id,
          userEmail: meeting.user_email,
          tenantEmail: meeting.tenant_email,
          startTime: formattedStartDate,
          endTime: formattedEndDate,
          status: meeting.status || "Scheduled",
          meetingLink: meeting.meeting_link,
        };
      });

      setMeetings(transformedMeetings);
    }
  }, [data]);

  // Handle status change to mark as attended
  const handleMarkAsAttended = async (meetingId) => {
    const result = await updateStatus(meetingId, "ATTENDED");
    if (result) {
      // Refresh the meetings list after successful update
      refetch();
    }
  };

  // Handle status change to mark as missed
  const handleMarkAsMissed = async (meetingId) => {
    const result = await updateStatus(meetingId, "MISSED");
    if (result) {
      // Refresh the meetings list after successful update
      refetch();
    }
  };

  // Add email functionality
  const handleEmailClick = (email) => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
      "_blank"
    );
  };

  // Format meeting link as clickable element
  const formatMeetingLink = (link) => {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.meetingLink}
      >
        Open Meeting
      </a>
    );
  };

  // Get formatted status display
  const getStatusDisplay = (status) => {
    if (!status) return "Scheduled";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // Status dropdown options with handlers
  const statusOptions = [
    {
      label: "Mark as Attended",
      value: "ATTENDED",
      onClick: (meetingId) => handleMarkAsAttended(meetingId),
    },
    {
      label: "Mark as Missed",
      value: "MISSED",
      onClick: (meetingId) => handleMarkAsMissed(meetingId),
    },
  ];

  // Transform data to include dropdown components and formatted fields
  const transformedData = meetings.map((meeting) => ({
    ...meeting,
    // Custom rendering for email to make it clickable
    userEmail: (
      <span
        className={styles.emailLink}
        onClick={() => handleEmailClick(meeting.userEmail)}
      >
        {meeting.userEmail}
      </span>
    ),
    // Custom rendering for meeting link
    meetingLink: formatMeetingLink(meeting.meetingLink),
    // Display formatted status
    statusDisplay: getStatusDisplay(meeting.status),
    // Actions dropdown for status updates
    actions: (
      <Dropdown
        options={statusOptions.map((option) => ({
          ...option,
          onClick: () => option.onClick(meeting.id),
        }))}
        disabled={updateLoading}
        label="Update Status"
      />
    ),
  }));

  // Updated headers definition matching the API data structure
  const headers = [
    { key: "userEmail", label: "User Email" },
    { key: "tenantEmail", label: "Tenant Email" },
    { key: "meetingLink", label: "Meeting Link" },
    { key: "startTime", label: "Start Time" },
    { key: "endTime", label: "End Time" },
    { key: "statusDisplay", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  // Define which fields are clickable
  const clickableFields = ["userEmail", "meetingLink"];

  // Style overrides for specific columns
  const columnStyles = {
    userEmail: {
      cursor: "pointer",
      color: "#0358AC",
      textDecoration: "underline",
    },
    meetingLink: {
      cursor: "pointer",
      color: "#0358AC",
      textDecoration: "underline",
    },
    tenantEmail: {
      cursor: "default",
      color: "inherit",
      textDecoration: "none",
    },
  };

  // Search functionality
  const filteredMeetings = transformedData.filter((meeting) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    // We need to access the original meeting data for searching
    const originalMeeting = meetings.find((m) => m.id === meeting.id);

    return (
      (originalMeeting.userEmail &&
        originalMeeting.userEmail.toLowerCase().includes(searchLower)) ||
      (originalMeeting.tenantEmail &&
        originalMeeting.tenantEmail.toLowerCase().includes(searchLower))
    );
  });

  // Pagination logic
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeetings = filteredMeetings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);

  // Export to CSV functionality
  const exportToCSV = () => {
    // Create CSV headers - exclude action and meetingLink columns
    const csvHeaders = headers
      .filter(
        (header) => header.key !== "meetingLink" && header.key !== "actions"
      )
      .map((header) => header.label)
      .join(",");

    // Get data to export based on search filter (if any)
    const dataToExport = searchTerm
      ? meetings.filter((meeting) => {
          const searchLower = searchTerm.toLowerCase();
          return (
            (meeting.userEmail &&
              meeting.userEmail.toLowerCase().includes(searchLower)) ||
            (meeting.tenantEmail &&
              meeting.tenantEmail.toLowerCase().includes(searchLower))
          );
        })
      : meetings;

    // Convert meeting data to CSV rows (getting original values, not React components)
    const csvRows = dataToExport.map((meeting) => {
      return headers
        .filter(
          (header) => header.key !== "meetingLink" && header.key !== "actions"
        )
        .map((header) => {
          const value = meeting[header.key];
          // Wrap strings with commas in quotes
          return typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value;
        })
        .join(",");
    });

    // Combine headers and rows
    const csvContent = [csvHeaders, ...csvRows].join("\n");

    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "meetings.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render loading state when loading data or updating
  if (loading || updateLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>Error loading meetings data</div>
    );
  }

  return (
    <div className={styles.meetingsContainer}>
      <div className={styles.meetingsHeader}>
        <h2>Booked Meetings</h2>
        <div className={styles.meetingsActions}>
          <div className={styles.meetingsCount}>
            Total Meetings: {meetings.length}
          </div>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search by user or tenant email"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={styles.exportButton} onClick={exportToCSV}>
            Export to CSV
          </button>
        </div>
      </div>

      {meetings.length === 0 ? (
        <div className={styles.noMeetings}>No meetings found</div>
      ) : (
        <div className={styles.tableContainer}>
          <Table
            headers={headers}
            data={currentMeetings}
            clickableFields={clickableFields}
            columnStyles={columnStyles}
          />

          {totalPages > 1 && (
            <div className={styles.pagination}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`${styles.pageButton} ${
                      page === currentPage ? styles.activePage : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MeetingsTable;
