import React, { useState } from "react";
import Table from "src/Common/Table/Table";
import Dropdown from "src/Common/Dropdown/Dropdown";
import styles from "./MeetingsTable.module.scss";

const MeetingsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      name: "Jane Doe",
      phone: "5551234567",
      email: "jane@example.com",
      meetingDate: "2025-03-01",
      attended: "No",
      status: "Rebook",
    },
    {
      id: 2,
      name: "John Smith",
      phone: "5555678123",
      email: "john@example.com",
      meetingDate: "2025-03-02",
      attended: "No",
      status: "Archive",
    },
    {
      id: 3,
      name: "Alice Ray",
      phone: "5558765432",
      email: "alice@example.com",
      meetingDate: "2025-03-03",
      attended: "Yes",
      status: "Claimed",
    },
    {
      id: 4,
      name: "Bob Lee",
      phone: "5554321987",
      email: "bob@example.com",
      meetingDate: "2025-03-04",
      attended: "Yes",
      status: "Upgraded",
    },
    {
      id: 5,
      name: "Sophie Kim",
      phone: "5557890456",
      email: "sophie@example.com",
      meetingDate: "2025-03-05",
      attended: "Yes",
      status: "Dead",
    },
    {
      id: 6,
      name: "Tom Cruz",
      phone: "5553333344",
      email: "tom@example.com",
      meetingDate: "2025-03-06",
      attended: "--Select--",
      status: "--Select Attended First--",
    },
    {
      id: 7,
      name: "Lisa Wong",
      phone: "5552222444",
      email: "lisa@example.com",
      meetingDate: "2025-03-07",
      attended: "--Select--",
      status: "--Select Attended First--",
    },
    {
      id: 8,
      name: "Kevin Hart",
      phone: "5551111555",
      email: "kevin@example.com",
      meetingDate: "2025-03-08",
      attended: "--Select--",
      status: "--Select Attended First--",
    },
    {
      id: 9,
      name: "Nancy Drew",
      phone: "5559999888",
      email: "nancy@example.com",
      meetingDate: "2025-03-09",
      attended: "--Select--",
      status: "--Select Attended First--",
    },
    {
      id: 10,
      name: "Steve Nash",
      phone: "5558888777",
      email: "steve@example.com",
      meetingDate: "2025-03-10",
      attended: "--Select--",
      status: "--Select Attended First--",
    },
    {
      id: 11,
      name: "Emily Johnson",
      phone: "5557773333",
      email: "emily@example.com",
      meetingDate: "2025-03-11",
      attended: "--Select--",
      status: "--Select Attended First--",
    },
    {
      id: 12,
      name: "Michael Brown",
      phone: "5556664444",
      email: "michael@example.com",
      meetingDate: "2025-03-12",
      attended: "--Select--",
      status: "--Select Attended First--",
    },
    {
      id: 13,
      name: "Sarah Davis",
      phone: "5551112222",
      email: "sarah@example.com",
      meetingDate: "2025-03-13",
      attended: "--Select--",
      status: "--Select Attended First--",
    },
    {
      id: 14,
      name: "David Wilson",
      phone: "5553334444",
      email: "david@example.com",
      meetingDate: "2025-03-14",
      attended: "--Select--",
      status: "--Select Attended First--",
    },
    {
      id: 15,
      name: "Jennifer Miller",
      phone: "5555556666",
      email: "jennifer@example.com",
      meetingDate: "2025-03-15",
      attended: "--Select--",
      status: "--Select Attended First--",
    },
    {
      id: 16,
      name: "Robert Taylor",
      phone: "5557778888",
      email: "robert@example.com",
      meetingDate: "2025-03-16",
      attended: "--Select--",
      status: "--Select Attended First--",
    },
    {
      id: 17,
      name: "Amanda Clark",
      phone: "5559990000",
      email: "amanda@example.com",
      meetingDate: "2025-03-17",
      attended: "--Select--",
      status: "--Select Attended First--",
    },
  ]);

  const itemsPerPage = 10;

  // Dropdown options for "Attended" column
  const attendedOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
    { label: "--Select--", value: "--Select--" },
  ];

  // Dropdown options for "Status" column
  const statusOptions = [
    { label: "Rebook", value: "Rebook" },
    { label: "Archive", value: "Archive" },
    { label: "Claimed", value: "Claimed" },
    { label: "Upgraded", value: "Upgraded" },
    { label: "Dead", value: "Dead" },
    { label: "--Select Attended First--", value: "--Select Attended First--" },
  ];

  // Handle status change
  const handleStatusChange = (meetingId, newStatus) => {
    setMeetings((prevMeetings) =>
      prevMeetings.map((meeting) =>
        meeting.id === meetingId ? { ...meeting, status: newStatus } : meeting
      )
    );
  };

  // Handle attended change
  const handleAttendedChange = (meetingId, attended) => {
    setMeetings((prevMeetings) =>
      prevMeetings.map((meeting) =>
        meeting.id === meetingId
          ? {
              ...meeting,
              attended,
              // If attended field is cleared or set to "--Select--", also reset status
              status:
                attended === "--Select--"
                  ? "--Select Attended First--"
                  : meeting.status,
            }
          : meeting
      )
    );
  };

  // Add email functionality
  const handleEmailClick = (email) => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
      "_blank"
    );
  };

  // Transform data to include dropdown components
  const transformedData = meetings.map((meeting) => ({
    ...meeting,
    // Custom rendering for email to make it clickable
    email: (
      <span
        className={styles.emailLink}
        onClick={() => handleEmailClick(meeting.email)}
      >
        {meeting.email}
      </span>
    ),
    attended: (
      <Dropdown
        selectedOption={meeting.attended}
        options={attendedOptions.map((option) => ({
          ...option,
          onClick: () => handleAttendedChange(meeting.id, option.value),
        }))}
      />
    ),
    status: (
      <Dropdown
        selectedOption={meeting.status}
        options={statusOptions.map((option) => ({
          ...option,
          onClick: () => handleStatusChange(meeting.id, option.value),
          disabled:
            meeting.attended === "--Select--" &&
            option.value !== "--Select Attended First--",
        }))}
      />
    ),
  }));

  // Headers definition matching the format expected by the Table component
  const headers = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "meetingDate", label: "Meeting Date" },
    { key: "attended", label: "Attended" },
    { key: "status", label: "Status" },
  ];

  // Define which fields are clickable - only email (NOT name)
  const clickableFields = ["email"];

  // Style overrides for specific columns
  const columnStyles = {
    email: {
      cursor: "pointer",
      color: "#0358AC",
      textDecoration: "underline",
    },
    name: {
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
      originalMeeting.name.toLowerCase().includes(searchLower) ||
      originalMeeting.email.toLowerCase().includes(searchLower) ||
      originalMeeting.phone.toLowerCase().includes(searchLower)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeetings = filteredMeetings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);

  // Export to CSV functionality - ensure we export ALL meetings, not just current page
  const exportToCSV = () => {
    // Create CSV headers
    const csvHeaders = headers.map((header) => header.label).join(",");

    // Get data to export based on search filter (if any)
    // If search is active, use the filtered data, otherwise use all meetings
    const dataToExport = searchTerm
      ? meetings.filter((meeting) => {
          const searchLower = searchTerm.toLowerCase();
          return (
            meeting.name.toLowerCase().includes(searchLower) ||
            meeting.email.toLowerCase().includes(searchLower) ||
            meeting.phone.toLowerCase().includes(searchLower)
          );
        })
      : meetings;

    // Convert meeting data to CSV rows (getting original values, not React components)
    const csvRows = dataToExport.map((meeting) => {
      return headers
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
              placeholder="Search by name, email, phone"
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

      <Table
        headers={headers}
        data={currentMeetings}
        clickableFields={clickableFields}
        columnStyles={columnStyles}
      />

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`${styles.pageButton} ${
                page === currentPage ? styles.activePage : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeetingsTable;
