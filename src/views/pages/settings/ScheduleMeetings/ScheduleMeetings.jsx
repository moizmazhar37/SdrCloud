import React, { useState, useEffect } from "react";
import styles from "./ScheduleMeetings.module.scss";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import { useSetAvailability } from "./Hooks/useSetAvailability";
import useTenantSlots from "../../VideoBooking/Hooks/useTenantSlots";

const ScheduleMeetings = () => {
  const tenant_id = localStorage.getItem("tenant_id");
  const {
    data: tenantSlots,
    error: slotsError,
    loading: slotsLoading,
    refetch: refetchSlots,
  } = useTenantSlots(tenant_id);

  // State for existing slots grouped by day
  const [existingSlots, setExistingSlots] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

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

  const navs = [
    { text: "Settings", route: "/settings" },
    { text: "Schedule Meeting", route: "/book-meeting" },
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

  // Use the availability hook
  const { setAvailability, loading, error } = useSetAvailability();

  // State to track which day is currently saving
  const [savingDay, setSavingDay] = useState(null);

  // Get user's timezone on component mount
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);

    // Calculate offset in minutes between local and UTC
    const now = new Date();
    const offsetInMinutes = now.getTimezoneOffset();
    setTimezoneOffset(offsetInMinutes);
  }, []);

  // Process existing slots when tenant slots data is loaded
  useEffect(() => {
    if (tenantSlots?.slots) {
      const grouped = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      };

      tenantSlots.slots.forEach((slot) => {
        const slotDate = new Date(slot);
        const dayOfWeek = slotDate.toLocaleDateString('en-US', { weekday: 'long' });
        
        if (grouped[dayOfWeek]) {
          grouped[dayOfWeek].push({
            utc: slot,
            local: slotDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          });
        }
      });

      setExistingSlots(grouped);
    }
  }, [tenantSlots]);

  // Function to add a time slot
  const addTimeSlot = (day) => {
    const { hour, minute } = currentTimeInputs[day];

    // Validation
    if (!hour || !minute) return;

    // Create a date object using local time
    const localDate = new Date();
    localDate.setHours(parseInt(hour), parseInt(minute), 0, 0);

    // Convert to UTC and extract only the time portion (HH:MM:SS.sssZ)
    const utcTimeString = localDate.toISOString().split("T")[1]; // Gets "HH:MM:SS.sssZ"

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
  const formatLocalTime = (timeString) => {
    // timeString is now in format "HH:MM:SS.sssZ"
    // Create a date object for today with this UTC time
    const today = new Date().toISOString().split("T")[0]; // Gets "YYYY-MM-DD"
    const fullDateString = `${today}T${timeString}`;
    const date = new Date(fullDateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format time to display in UTC
  const formatUTCTime = (timeString) => {
    // timeString is already in UTC format "HH:MM:SS.sssZ"
    return timeString.substring(0, 5); // Gets "HH:MM"
  };

  // Save time slots for a specific day
  const saveTimeSlots = async (day) => {
    try {
      setSavingDay(day);

      // Ensure all time slots are in the correct format (HH:MM:SS.sssZ)
      const formattedTimeSlots = timeSlots[day].map((slot) => {
        // If slot contains 'T', it's a full datetime, extract time portion
        if (slot.includes("T")) {
          return slot.split("T")[1];
        }
        // Otherwise, it's already in time format
        return slot;
      });

      const data = {
        weekday: day,
        time_slots_utc: formattedTimeSlots,
      };

      console.log("Sending data to API:", data);
      await setAvailability(data);
      
      // Refetch slots after successful save
      await refetchSlots();
    } catch (err) {
      console.error("Error saving time slots:", err);
    } finally {
      setSavingDay(null);
    }
  };

  return (
    <>
      {" "}
      <DynamicNavigator items={navs} />
      <div className={styles.scheduleMeetings}>
        <h1 className={styles.title}>Schedule Meetings</h1>
        {/* <p className={styles.description}>
          Set your availability for the next 7 days
        </p> */}
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
                  <label className={styles.timePickerLabel}>
                    Add Availability Time
                  </label>
                  <div className={styles.timePickerWrapper}>
                    <div className={styles.timeInputGroup}>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={currentTimeInputs[day].hour}
                        onChange={(e) => handleHourChange(day, e.target.value)}
                        className={styles.timeInput}
                        placeholder="HH"
                      />
                      <span className={styles.timeSeparator}>:</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={currentTimeInputs[day].minute}
                        onChange={(e) =>
                          handleMinuteChange(day, e.target.value)
                        }
                        className={styles.timeInput}
                        placeholder="MM"
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
                  {/* Existing Slots */}
                  {existingSlots[day].length > 0 && (
                    <div className={styles.existingSlotsSection}>
                      <h3 className={styles.sectionTitle}>
                        <span className={styles.existingIcon}>🗓️</span>
                        Current Slots
                      </h3>
                      <ul className={styles.timeSlotsList}>
                        {existingSlots[day].map((slot, index) => (
                          <li key={`existing-${index}`} className={`${styles.timeSlot} ${styles.existingSlot}`}>
                            <div className={styles.timeInfo}>
                              <span className={styles.localTime}>
                                {slot.local}
                              </span>
                              <span className={styles.utcTime}>
                                {new Date(slot.utc).toISOString().split('T')[1].substring(0, 5)} UTC
                              </span>
                            </div>
                            <span className={styles.existingLabel}>Saved</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* New Slots */}
                  <div className={styles.newSlotsSection}>
                    <h3 className={styles.sectionTitle}>
                      <span className={styles.newIcon}>⚡</span>
                      New Time Slots
                    </h3>
                    {timeSlots[day].length === 0 ? (
                      <p className={styles.noTimes}>No new times selected</p>
                    ) : (
                      <ul className={styles.timeSlotsList}>
                        {timeSlots[day].map((slot, index) => (
                          <li key={index} className={`${styles.timeSlot} ${styles.newSlot}`}>
                            <div className={styles.timeInfo}>
                              <span className={styles.localTime}>
                                {formatLocalTime(slot)}
                              </span>
                              <span className={styles.utcTime}>
                                {formatUTCTime(slot)} UTC
                              </span>
                            </div>
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
              </div>
              <div className={styles.saveButtonContainer}>
                <button
                  className={styles.saveButton}
                  onClick={() => saveTimeSlots(day)}
                  disabled={loading && savingDay === day}
                >
                  {loading && savingDay === day ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScheduleMeetings;
