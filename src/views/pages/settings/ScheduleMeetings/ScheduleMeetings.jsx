import React, { useState, useEffect } from "react";
import styles from "./ScheduleMeetings.module.scss";

const ScheduleMeetings = () => {
  // Days of the week
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // State to store selected times for each day
  const [timeSlots, setTimeSlots] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  // State to store current time input for each day
  const [currentTimeInputs, setCurrentTimeInputs] = useState({
    Monday: { hour: "10", minute: "00" },
    Tuesday: { hour: "10", minute: "00" },
    Wednesday: { hour: "10", minute: "00" },
    Thursday: { hour: "10", minute: "00" },
    Friday: { hour: "10", minute: "00" },
    Saturday: { hour: "10", minute: "00" },
    Sunday: { hour: "10", minute: "00" },
  });

  // State for user's timezone
  const [userTimezone, setUserTimezone] = useState("");
  const [timezoneOffset, setTimezoneOffset] = useState(0);

  // Get user's timezone on component mount
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);

    // Calculate offset in minutes between local and UTC
    const now = new Date();
    const offsetInMinutes = now.getTimezoneOffset();
    setTimezoneOffset(offsetInMinutes);
  }, []);

  // Function to add a time slot
  const addTimeSlot = (day) => {
    const { hour, minute } = currentTimeInputs[day];

    // Validation
    if (!hour || !minute) return;

    // Create a date object using local time
    const localDate = new Date();
    localDate.setHours(parseInt(hour), parseInt(minute), 0, 0);

    // Convert local time to UTC time
    const utcTimeString = localDate.toISOString();

    setTimeSlots((prev) => ({
      ...prev,
      [day]: [...prev[day], utcTimeString],
    }));
  };

  // Function to remove a time slot
  const removeTimeSlot = (day, index) => {
    setTimeSlots((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  // Handle hour change
  const handleHourChange = (day, value) => {
    // Ensure the value is between 0-23
    let hour = parseInt(value);
    if (isNaN(hour)) hour = 0;
    if (hour < 0) hour = 0;
    if (hour > 23) hour = 23;

    setCurrentTimeInputs((prev) => ({
      ...prev,
      [day]: { ...prev[day], hour: hour.toString().padStart(2, "0") },
    }));
  };

  // Handle minute change
  const handleMinuteChange = (day, value) => {
    // Ensure the value is between 0-59
    let minute = parseInt(value);
    if (isNaN(minute)) minute = 0;
    if (minute < 0) minute = 0;
    if (minute > 59) minute = 59;

    setCurrentTimeInputs((prev) => ({
      ...prev,
      [day]: { ...prev[day], minute: minute.toString().padStart(2, "0") },
    }));
  };

  // Format time to display in local timezone
  const formatLocalTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format time to display in UTC
  const formatUTCTime = (dateString) => {
    const date = new Date(dateString);
    return date.toUTCString().split(" ")[4].substring(0, 5);
  };

  // Save time slots for a specific day
  const saveTimeSlots = (day) => {
    const data = {
      weekday: day,
      time_slots_utc: timeSlots[day],
    };
    console.log(data);
    console.log(userTimezone);
    // Here you would typically send this data to your backend
  };

  return (
    <div className={styles.scheduleMeetings}>
      <h1 className={styles.title}>Schedule Meetings</h1>
      <p className={styles.description}>
        Set your availability for the next 7 days
      </p>
      <p className={styles.timezoneInfo}>
        Your timezone: {userTimezone || "Detecting..."}
      </p>

      <div className={styles.daysContainer}>
        {weekdays.map((day) => (
          <div key={day} className={styles.dayCard}>
            <div className={styles.dayHeader}>
              <h2>{day}</h2>
            </div>
            <div className={styles.timeSelectionArea}>
              <div className={styles.timePickerContainer}>
                <label>Add Availability Time (Your Local Time)</label>
                <div className={styles.timePickerWrapper}>
                  <div className={styles.timeInputGroup}>
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={currentTimeInputs[day].hour}
                      onChange={(e) => handleHourChange(day, e.target.value)}
                      className={styles.timeInput}
                    />
                    <span className={styles.timeSeparator}>:</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={currentTimeInputs[day].minute}
                      onChange={(e) => handleMinuteChange(day, e.target.value)}
                      className={styles.timeInput}
                    />
                  </div>
                </div>

                <button
                  className={styles.addTimeButton}
                  onClick={() => addTimeSlot(day)}
                >
                  + Add Time
                </button>
              </div>

              <div className={styles.selectedTimesSection}>
                <h3>Selected Time Slots:</h3>
                {timeSlots[day].length === 0 ? (
                  <p className={styles.noTimes}>No times selected</p>
                ) : (
                  <ul className={styles.timeSlotsList}>
                    {timeSlots[day].map((slot, index) => (
                      <li key={index} className={styles.timeSlot}>
                        <span className={styles.localTime}>
                          {formatLocalTime(slot)} (Your time)
                        </span>
                        <span className={styles.utcTime}>
                          {formatUTCTime(slot)} UTC
                        </span>
                        <button
                          className={styles.removeButton}
                          onClick={() => removeTimeSlot(day, index)}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className={styles.saveButtonContainer}>
              <button
                className={styles.saveButton}
                onClick={() => saveTimeSlots(day)}
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleMeetings;
