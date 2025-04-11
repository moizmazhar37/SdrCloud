import React, { useState, useRef, useEffect } from "react";
import styles from "./DateRangeDropdown.module.scss";

const DateRangeDropdown = ({ onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [displayText, setDisplayText] = useState("Date Range");
  const dropdownRef = useRef(null);

  // Effect to handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect to load saved date range from localStorage on component mount
  useEffect(() => {
    const savedStartDate = localStorage.getItem("dashboard_start_date");
    const savedEndDate = localStorage.getItem("dashboard_end_date");

    if (savedStartDate && savedEndDate) {
      // Convert ISO strings to date input format (YYYY-MM-DD)
      const formatForDateInput = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
      };

      const formattedStartDate = formatForDateInput(savedStartDate);
      const formattedEndDate = formatForDateInput(savedEndDate);

      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);

      // Notify parent component of the date range (if needed)
      if (onDateRangeChange) {
        onDateRangeChange({
          startDate: savedStartDate,
          endDate: savedEndDate,
        });
      }
    }
  }, [onDateRangeChange]);

  // Effect to update display text when dates change
  useEffect(() => {
    if (startDate && endDate) {
      setDisplayText(`${formatDate(startDate)} - ${formatDate(endDate)}`);
    } else if (startDate) {
      setDisplayText(`${formatDate(startDate)} - Select End Date`);
    } else {
      setDisplayText("Date Range");
    }
  }, [startDate, endDate]);

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
    if (startDate && endDate) {
      // Convert date strings to ISO format for API compatibility
      const startDateISO = new Date(startDate).toISOString();
      const endDateISO = new Date(endDate).toISOString();

      onDateRangeChange({ startDate: startDateISO, endDate: endDateISO });
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    localStorage.removeItem("dashboard_start_date");
    localStorage.removeItem("dashboard_end_date");
    onDateRangeChange({ startDate: null, endDate: null });
  };

  return (
    <div className={styles.dateRangeContainer} ref={dropdownRef}>
      <button
        className={styles.dateRangeButton}
        onClick={() => setIsOpen(!isOpen)}
      >
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
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={endDate || undefined}
              />
            </div>
            <div className={styles.datePickerGroup}>
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || undefined}
                disabled={!startDate}
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
              disabled={!startDate || !endDate}
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
