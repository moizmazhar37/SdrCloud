import React, { useState } from "react";
import styles from "./CalenderLink.module.scss";
import useUpdateCalendarLink from "./useUpdateCalenderLink";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";

const CalendarLink = () => {
  const [meetLink, setMeetLink] = useState("");
  const { updateCalendarLink, loading } = useUpdateCalendarLink();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (meetLink.trim()) {
      updateCalendarLink(meetLink);
    }
  };

  return (
    <>
      <DynamicNavigator
        items={[
          { text: "Settings", route: "/settings" },
          { text: "Integration", route: "/integrations" },
          { text: "Calender Link", route: "/calenderlink" },
        ]}
      />
      <div className={styles.container}>
        <div className={styles.notification}>
          <p> Set Calendar Link to Schedule Meeting with People</p>
        </div>

        <div className={styles.formContainer}>
          <h2 className={styles.heading}>Enter Meeting Link </h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="meetLink" className={styles.label}>
                Update Meet Link
              </label>
              <input
                type="text"
                id="meetLink"
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                placeholder="Enter link here"
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CalendarLink;
