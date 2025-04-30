import React from "react";
import Table from "src/Common/Table/Table";
import Dropdown from "src/Common/Dropdown/Dropdown";
import Loader from "src/Common/Loader/Loader";
import useGetAllMeetings from "../EmailScheduling/Hooks/useGetAllMeetings";
import styles from "./BookedMeetings.module.scss";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";

const BookedMeetings = () => {
  const { data, loading, error } = useGetAllMeetings();

  const navigationItems = [
    { text: "Settings", route: "/settings" },
    { text: "Booked Meetings", route: "/booked-meetings" },
  ];

  const handleMarkAsAttended = (meetingId) => {
    console.log("Testing - Mark as attended for meeting:", meetingId);
  };

  const handleMarkAsMissed = (meetingId) => {
    console.log("Testing - Mark as missed for meeting:", meetingId);
  };

  const headers = [
    { label: "User Email", key: "user_email" },
    { label: "Tenant Email", key: "tenant_email" },
    { label: "Meeting Link", key: "meeting_link_display" },
    { label: "Start Time", key: "formatted_start_time" },
    { label: "End Time", key: "formatted_end_time" },
    { label: "Status", key: "status_display" },
    { label: "Actions", key: "actions" },
  ];

  const dropdownOptions = [
    {
      label: "Mark as Attended",
      onClick: (meetingId) => {
        handleMarkAsAttended(meetingId);
      },
    },
    {
      label: "Mark as Missed",
      onClick: (meetingId) => {
        handleMarkAsMissed(meetingId);
      },
    },
  ];

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

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

  const getStatusDisplay = (status) => {
    if (!status) return "Scheduled";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const transformedData =
    data?.meetings?.map((meeting) => ({
      ...meeting,
      meeting_link_display: formatMeetingLink(meeting.meeting_link),
      formatted_start_time: formatDateTime(meeting.start_time),
      formatted_end_time: formatDateTime(meeting.end_time),
      status_display: getStatusDisplay(meeting.status),
      actions: (
        <Dropdown
          options={dropdownOptions.map((option) => ({
            ...option,
            onClick: () => option.onClick(meeting.meeting_id),
          }))}
        />
      ),
    })) || [];

  return (
    <div className={styles.container}>
      <DynamicNavigator items={navigationItems} />

      <div className={styles.headerContainer}>
        <h1 className={styles.title}>Booked Meetings</h1>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            Error loading meetings data
          </div>
        ) : (
          <Table headers={headers} data={transformedData} />
        )}
      </div>
    </div>
  );
};

export default BookedMeetings;
