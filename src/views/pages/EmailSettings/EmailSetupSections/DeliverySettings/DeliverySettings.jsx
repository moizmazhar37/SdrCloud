import React, { useState } from "react";
import styles from "./DeliverySettings.module.scss";

const DeliverySettings = ({ onNext, onDataChange }) => {
  const [deliveryTypes, setDeliveryTypes] = useState(["Email"]);
  const [maxReminders, setMaxReminders] = useState("5");
  const [scheduleType, setScheduleType] = useState("Recurring");
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

  const handleDataChange = (newData) => {
    const allData = {
      deliveryTypes,
      maxReminders,
      scheduleType,
      weekdaysEnabled,
      weekendsEnabled,
      weekdaysTimes,
      weekendsTimes,
      ...newData,
    };
    onDataChange && onDataChange(allData);
  };

  const handleDeliveryTypeToggle = (type) => {
    let newTypes;
    if (deliveryTypes.includes(type)) {
      newTypes = deliveryTypes.filter((t) => t !== type);
    } else {
      newTypes = [...deliveryTypes, type];
    }
    setDeliveryTypes(newTypes);
    handleDataChange({ deliveryTypes: newTypes });
  };

  const handleRemoveDeliveryType = (type) => {
    const newTypes = deliveryTypes.filter((t) => t !== type);
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
      const newTimes = { ...weekdaysTimes, [timeType]: value };
      setWeekdaysTimes(newTimes);
      handleDataChange({ weekdaysTimes: newTimes });
    } else {
      const newTimes = { ...weekendsTimes, [timeType]: value };
      setWeekendsTimes(newTimes);
      handleDataChange({ weekendsTimes: newTimes });
    }
  };

  return (
    <div className={styles.deliverySettings}>
      {/* Delivery Type Section */}

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

      {/* Deliver Email Section */}
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
      <div className={styles.buttonSection}>
        <button className={styles.saveButton} onClick={() => {}}>
          Save
        </button>
        <button className={styles.nextButton} onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DeliverySettings;
