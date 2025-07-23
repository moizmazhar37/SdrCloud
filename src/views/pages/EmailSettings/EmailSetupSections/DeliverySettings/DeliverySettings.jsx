import React, { useState, useEffect, useRef } from "react";
import styles from "./DeliverySettings.module.scss";
import useSaveDeliverySettings from "../Hooks/useSaveDeliverySettings";
import {
  extractTime,
  initializeDeliveryData,
  toggleDeliveryType,
  removeDeliveryType,
  updateTimeForDayType,
  prepareSettingsForSave,
  createDataChangePayload,
} from "./helpers";

const DeliverySettings = ({
  onNext,
  onDataChange,
  initialData,
  currentData,
}) => {
  const [deliveryTypes, setDeliveryTypes] = useState(["Email"]);
  const [maxReminders, setMaxReminders] = useState("5");
  const [scheduleType, setScheduleType] = useState("Recurring");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("08:00");
  const [weekdaysEnabled, setWeekdaysEnabled] = useState(false);
  const [weekendsEnabled, setWeekendsEnabled] = useState(true);
  const [weekdaysTimes, setWeekdaysTimes] = useState({
    start: "08:00",
    end: "08:00",
  });
  const [weekendsTimes, setWeekendsTimes] = useState({
    start: "08:00",
    end: "08:00",
  });
  const isInitialized = useRef(false);

  const TEMPLATE_ID = localStorage.getItem("selectedTemplateId");
  const { saveDeliverySettings, loading, error } = useSaveDeliverySettings();

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Convert date and time to UTC format
  const convertToUTC = (date, time) => {
    if (!date || !time) return null;

    const localDateTime = new Date(`${date}T${time}`);
    return localDateTime.toISOString();
  };

  // Get start_date in UTC format
  const getStartDateUTC = () => {
    if (scheduleType === "Schedule Later" && scheduledDate && scheduledTime) {
      return convertToUTC(scheduledDate, scheduledTime);
    }
    return null;
  };

  // Use currentData (from parent state) instead of initialData for state initialization
  useEffect(() => {
    const dataToUse = currentData || initialData;

    if (dataToUse && !isInitialized.current) {
      setMaxReminders(dataToUse.maxReminders || "5");
      setScheduleType(dataToUse.scheduleType || "Recurring");
      setScheduledDate(dataToUse.scheduledDate || "");
      setScheduledTime(dataToUse.scheduledTime || "08:00");
      setWeekdaysEnabled(dataToUse.weekdaysEnabled || false);
      setWeekendsEnabled(dataToUse.weekendsEnabled !== false); // default to true
      setWeekdaysTimes(
        dataToUse.weekdaysTimes || { start: "08:00", end: "08:00" }
      );
      setWeekendsTimes(
        dataToUse.weekendsTimes || { start: "08:00", end: "08:00" }
      );
      setDeliveryTypes(dataToUse.deliveryTypes || ["Email"]);

      isInitialized.current = true;

      // Only call onDataChange if this is the initial load
      if (!currentData) {
        onDataChange && onDataChange(dataToUse);
      }
    }
  }, [currentData, initialData, onDataChange]);

  // Update local state when currentData changes (when switching between tabs)
  useEffect(() => {
    if (currentData && isInitialized.current) {
      setDeliveryTypes(currentData.deliveryTypes);
      setMaxReminders(currentData.maxReminders);
      setScheduleType(currentData.scheduleType);
      setScheduledDate(currentData.scheduledDate);
      setScheduledTime(currentData.scheduledTime);
      setWeekdaysEnabled(currentData.weekdaysEnabled);
      setWeekendsEnabled(currentData.weekendsEnabled);
      setWeekdaysTimes(currentData.weekdaysTimes);
      setWeekendsTimes(currentData.weekendsTimes);
    }
  }, [currentData]);

  const handleDataChange = (newData) => {
    const allData = createDataChangePayload(
      deliveryTypes,
      maxReminders,
      scheduleType,
      weekdaysEnabled,
      weekendsEnabled,
      weekdaysTimes,
      weekendsTimes,
      {
        scheduledDate,
        scheduledTime,
        ...newData,
      }
    );
    onDataChange && onDataChange(allData);
  };

  const handleDeliveryTypeToggle = (type) => {
    const newTypes = toggleDeliveryType(deliveryTypes, type);
    setDeliveryTypes(newTypes);
    handleDataChange({ deliveryTypes: newTypes });
  };

  const handleRemoveDeliveryType = (type) => {
    const newTypes = removeDeliveryType(deliveryTypes, type);
    setDeliveryTypes(newTypes);
    handleDataChange({ deliveryTypes: newTypes });
  };

  const handleMaxRemindersChange = (value) => {
    setMaxReminders(value);
    handleDataChange({ maxReminders: value });
  };

  const handleScheduleTypeChange = (type) => {
    setScheduleType(type);
    handleDataChange({ scheduleType: type });
  };

  const handleScheduledDateChange = (date) => {
    setScheduledDate(date);
    handleDataChange({ scheduledDate: date });
  };

  const handleScheduledTimeChange = (time) => {
    setScheduledTime(time);
    handleDataChange({ scheduledTime: time });
  };

  const handleWeekdaysToggle = () => {
    const newValue = !weekdaysEnabled;
    setWeekdaysEnabled(newValue);
    handleDataChange({ weekdaysEnabled: newValue });
  };

  const handleWeekendsToggle = () => {
    const newValue = !weekendsEnabled;
    setWeekendsEnabled(newValue);
    handleDataChange({ weekendsEnabled: newValue });
  };

  const handleTimeChange = (dayType, timeType, value) => {
    if (dayType === "weekdays") {
      const newTimes = updateTimeForDayType(weekdaysTimes, timeType, value);
      setWeekdaysTimes(newTimes);
      handleDataChange({ weekdaysTimes: newTimes });
    } else {
      const newTimes = updateTimeForDayType(weekendsTimes, timeType, value);
      setWeekendsTimes(newTimes);
      handleDataChange({ weekendsTimes: newTimes });
    }
  };

  const handleSave = async () => {
    try {
      const settings = prepareSettingsForSave(
        maxReminders,
        weekdaysEnabled,
        weekendsEnabled,
        weekdaysTimes,
        weekendsTimes,
        scheduleType,
        scheduledDate,
        scheduledTime
      );

      console.log("Saving delivery settings:", settings);

      await saveDeliverySettings(TEMPLATE_ID, settings);
      console.log("Delivery settings saved successfully");
    } catch (err) {
      console.error("Error saving delivery settings:", err);
    }
  };

  return (
    <div className={styles.deliverySettings}>
      {/* Maximum Numbers Section */}
      <div className={styles.section}>
        <div className={styles.maxRemindersContainer}>
          <h3 className={styles.sectionTitle}>
            Maximum Numbers of Email & SMS Reminder
          </h3>
          <div className={styles.dropdown}>
            <select
              value={maxReminders}
              onChange={(e) => handleMaxRemindersChange(e.target.value)}
              className={styles.select}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Schedule Type Section */}
      <div className={styles.section}>
        <div className={styles.scheduleButtons}>
          <button
            className={`${styles.scheduleButton} ${
              scheduleType === "Recurring" ? styles.active : ""
            }`}
            onClick={() => handleScheduleTypeChange("Recurring")}
          >
            Recurring
          </button>

          <button
            className={`${styles.scheduleButton} ${
              scheduleType === "Schedule Later" ? styles.active : ""
            }`}
            onClick={() => handleScheduleTypeChange("Schedule Later")}
          >
            Schedule Later
          </button>
        </div>
      </div>

      {/* Schedule Later Date/Time Section */}
      {scheduleType === "Schedule Later" && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Select Date & Time</h3>
          <div className={styles.scheduleDateTimeContainer}>
            <div className={styles.datePickerContainer}>
              <label className={styles.inputLabel}>Date</label>
              <input
                type="date"
                value={scheduledDate}
                min={getTodayDate()}
                onChange={(e) => handleScheduledDateChange(e.target.value)}
                className={styles.dateInput}
                required
              />
            </div>
            <div className={styles.timePickerContainer}>
              <label className={styles.inputLabel}>Time</label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => handleScheduledTimeChange(e.target.value)}
                className={styles.timePickerInput}
              />
            </div>
          </div>
          {scheduledDate && scheduledTime && (
            <div className={styles.utcPreview}>
              <small>UTC Time: {getStartDateUTC()}</small>
            </div>
          )}
        </div>
      )}

      {/* Deliver Email Section - Only show for Recurring */}
      {scheduleType === "Recurring" && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Deliver Email on</h3>

          {/* Weekdays */}
          <div className={styles.timeRow}>
            <div className={styles.daySection}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={weekdaysEnabled}
                  onChange={handleWeekdaysToggle}
                />
                <span className={styles.checkmark}></span>
                <span className={styles.dayLabel}>Weekdays</span>
              </label>
            </div>
            <div className={styles.timeInputs}>
              <div className={styles.timeInput}>
                <input
                  type="time"
                  value={weekdaysTimes.start}
                  onChange={(e) =>
                    handleTimeChange("weekdays", "start", e.target.value)
                  }
                />
              </div>
              <span className={styles.timeSeparator}>–</span>
              <div className={styles.timeInput}>
                <input
                  type="time"
                  value={weekdaysTimes.end}
                  onChange={(e) =>
                    handleTimeChange("weekdays", "end", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Weekends */}
          <div className={styles.timeRow}>
            <div className={styles.daySection}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={weekendsEnabled}
                  onChange={handleWeekendsToggle}
                />
                <span className={styles.checkmark}></span>
                <span className={styles.dayLabel}>Weekends</span>
              </label>
            </div>
            <div className={styles.timeInputs}>
              <div className={styles.timeInput}>
                <input
                  type="time"
                  value={weekendsTimes.start}
                  onChange={(e) =>
                    handleTimeChange("weekends", "start", e.target.value)
                  }
                />
              </div>
              <span className={styles.timeSeparator}>–</span>
              <div className={styles.timeInput}>
                <input
                  type="time"
                  value={weekendsTimes.end}
                  onChange={(e) =>
                    handleTimeChange("weekends", "end", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.buttonSection}>
        <button
          className={styles.saveButton}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button className={styles.nextButton} onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DeliverySettings;
