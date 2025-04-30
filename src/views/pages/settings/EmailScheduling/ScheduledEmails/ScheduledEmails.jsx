import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Table from "src/Common/Table/Table";
import Dropdown from "src/Common/Dropdown/Dropdown";
import WarningModal from "src/Common/Modal/Modal";
import Loader from "src/Common/Loader/Loader";
import useFetchScheduleEmails from "../Hooks/useFetchScheduleEmails";
import useDeleteSchedule from "../Hooks/useDeleteSchedule";
import styles from "./ScheduledEmails.module.scss";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";

const ScheduledEmails = () => {
  const history = useHistory();
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  const {
    schedules,
    loading: loadingSchedules,
    refetch: refetchSchedules,
  } = useFetchScheduleEmails();
  const { deleteSchedule, deleting, error: deleteError } = useDeleteSchedule();

  const handleDelete = async () => {
    try {
      console.log("Deleting schedule with ID:", selectedScheduleId);
      await deleteSchedule(selectedScheduleId);
      console.log("Schedule deleted successfully");
      refetchSchedules();
    } catch (err) {
      console.error("Error in component while deleting schedule:", err);
    } finally {
      setDeleteOpen(false);
      setSelectedScheduleId(null);
    }
  };

  const handleAddNewSchedule = () => {
    history.push("/create-new-schedule");
  };

  const headers = [
    { label: "Template Name", key: "template_name" },
    { label: "Email Template", key: "email_template_name" },
    { label: "Scheduled Time", key: "formatted_time" },
    { label: "Template Type", key: "template_type" },
    { label: "Sequence", key: "schedule_sequence" },
    { label: "Status", key: "status" },
    { label: "Actions", key: "actions" },
  ];

  const dropdownOptions = [
    {
      label: "Delete",
      onClick: (scheduleId) => {
        setSelectedScheduleId(scheduleId);
        setDeleteOpen(true);
      },
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const transformedData = (schedules || []).map((schedule) => ({
    ...schedule,
    formatted_time: formatDate(schedule.scheduled_time),
    status: schedule.is_sent ? "Sent" : "Scheduled",
    actions: (
      <Dropdown
        options={dropdownOptions.map((option) => ({
          ...option,
          onClick: () => option.onClick(schedule.id),
        }))}
      />
    ),
  }));
  const navigationItems = [
    { text: "Settings", route: "/settings" },

    { text: "Email Scheduling", route: "/email-scheduling" },
  ];

  return (
    <>
      <DynamicNavigator items={navigationItems} />
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <button className={styles.addButton} onClick={handleAddNewSchedule}>
            Add New Schedule +
          </button>
        </div>

        <div className={styles.headerContainer}>
          <h1 className={styles.title}>Scheduled Emails</h1>
        </div>

        <div className={styles.tableContainer}>
          {loadingSchedules ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : (
            <Table headers={headers} data={transformedData} />
          )}
        </div>

        <WarningModal
          isOpen={isDeleteOpen}
          onCancel={() => {
            setDeleteOpen(false);
            setSelectedScheduleId(null);
          }}
          onDelete={handleDelete}
          message="Please be aware that this action is irreversible. By clicking the 'Delete' button below, you will permanently remove this scheduled email from the system."
        />
      </div>
    </>
  );
};

export default ScheduledEmails;
