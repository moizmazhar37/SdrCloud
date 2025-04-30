import React, { useState, useRef, useEffect } from "react";
import styles from "./DateRangeDropdown.module.scss";

const DateRangeDropdown = ({ onDateRangeChange, initialDateRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Initialize with initialDateRange if provided
  const [startDate, setStartDate] = useState(
    initialDateRange?.startDate
      ? new Date(initialDateRange.startDate).toISOString().split("T")[0]
      : ""
  );
  const [endDate, setEndDate] = useState(
    initialDateRange?.endDate
      ? new Date(initialDateRange.endDate).toISOString().split("T")[0]
      : ""
  );
  // Add temporary state to track values during editing
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [displayText, setDisplayText] = useState("Date Range");
  const dropdownRef = useRef(null);

  // Effect to handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        // Reset temp dates when closing dropdown without applying
        setTempStartDate(startDate);
        setTempEndDate(endDate);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [startDate, endDate]);

  // Effect to update display text when dates change or when initialDateRange changes
  useEffect(() => {
    if (initialDateRange?.startDate && initialDateRange?.endDate) {
      const formattedStartDate = formatDate(
        new Date(initialDateRange.startDate)
      );
      const formattedEndDate = formatDate(new Date(initialDateRange.endDate));
      setDisplayText(`${formattedStartDate} - ${formattedEndDate}`);

      // Update internal state to match initialDateRange
      const newStartDate = new Date(initialDateRange.startDate)
        .toISOString()
        .split("T")[0];
      const newEndDate = new Date(initialDateRange.endDate)
        .toISOString()
        .split("T")[0];

      setStartDate(newStartDate);
      setEndDate(newEndDate);
      setTempStartDate(newStartDate);
      setTempEndDate(newEndDate);
    } else if (startDate && endDate) {
      setDisplayText(`${formatDate(startDate)} - ${formatDate(endDate)}`);
    } else if (startDate) {
      setDisplayText(`${formatDate(startDate)} - Select End Date`);
    } else {
      setDisplayText("Date Range");
    }
  }, [startDate, endDate, initialDateRange]);

  // Update temp dates when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTempStartDate(startDate);
      setTempEndDate(endDate);
    }
  }, [isOpen, startDate, endDate]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleApply = () => {
    if (tempStartDate && tempEndDate) {
      // Update the real state with temporary values
      setStartDate(tempStartDate);
      setEndDate(tempEndDate);

      // Convert date strings to ISO format for API compatibility
      const startDateISO = new Date(tempStartDate).toISOString();
      const endDateISO = new Date(tempEndDate).toISOString();

      // Notify parent component of the date range change
      onDateRangeChange({ startDate: startDateISO, endDate: endDateISO });
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    // Clear both actual and temporary states
    setStartDate("");
    setEndDate("");
    setTempStartDate("");
    setTempEndDate("");

    // Notify parent component that date range has been cleared
    onDateRangeChange({ startDate: null, endDate: null });
  };

  // Toggle dropdown and initialize temp values
  const toggleDropdown = () => {
    if (!isOpen) {
      // When opening, initialize temp dates with current values
      setTempStartDate(startDate);
      setTempEndDate(endDate);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dateRangeContainer} ref={dropdownRef}>
      <button className={styles.dateRangeButton} onClick={toggleDropdown}>
        {displayText}
        <svg
          className={`${styles.chevronIcon} ${isOpen ? styles.rotated : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.datePickers}>
            <div className={styles.datePickerGroup}>
              <label>Start Date</label>
              <input
                type="date"
                value={tempStartDate}
                onChange={(e) => setTempStartDate(e.target.value)}
                max={tempEndDate || undefined}
              />
            </div>
            <div className={styles.datePickerGroup}>
              <label>End Date</label>
              <input
                type="date"
                value={tempEndDate}
                onChange={(e) => setTempEndDate(e.target.value)}
                min={tempStartDate || undefined}
                disabled={!tempStartDate}
              />
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.clearButton} onClick={handleClear}>
              Clear
            </button>
            <button
              className={styles.applyButton}
              onClick={handleApply}
              disabled={!tempStartDate || !tempEndDate}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeDropdown;
