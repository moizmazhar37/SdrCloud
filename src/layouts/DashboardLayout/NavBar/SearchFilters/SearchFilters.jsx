import React, { useState } from "react";
import styles from "./SearchFilters.module.scss";
import PersonalCriteriaDropdown from "./PersonalCriteriaDropdown/PersonalCriteriaDropdown";

const SearchFilters = () => {
  const [isPersonalCriteriaOpen, setIsPersonalCriteriaOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: {
      start: "02/03/2025",
      end: "02/10/2025",
    },
    personalCriteria: {
      name: { checked: false, value: { first: "", last: "" } },
      email: { checked: false, value: "" },
      gender: { checked: false, value: "" },
      ageRange: { checked: false, value: "" },
      married: { checked: false, value: false },
      hasChildren: { checked: false, value: false },
    },
    locationCriteria: "",
    financialCriteria: "",
    marketingCriteria: "",
  });

  const handleDateChange = (e) => {
    setFilters({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handlePersonalCriteriaChange = (newValues) => {
    setFilters({
      ...filters,
      personalCriteria: newValues,
    });
  };

  const handleSearch = () => {
    console.log("Current filters:", filters);
  };

  const handleReset = () => {
    setFilters({
      dateRange: {
        start: "",
        end: "",
      },
      personalCriteria: {
        name: { checked: false, value: { first: "", last: "" } },
        email: { checked: false, value: "" },
        gender: { checked: false, value: "" },
        ageRange: { checked: false, value: "" },
        married: { checked: false, value: false },
        hasChildren: { checked: false, value: false },
      },
      locationCriteria: "",
      financialCriteria: "",
      marketingCriteria: "",
    });
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchCriteria}>
        <h3>Search Criteria</h3>

        <div className={styles.dateSection}>
          <label>Date</label>
          <div className={styles.dateInputs}>
            <input
              type="date"
              name="start"
              value={filters.dateRange.start}
              onChange={handleDateChange}
            />
            <span>-</span>
            <input
              type="date"
              name="end"
              value={filters.dateRange.end}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className={styles.dropdownSection}>
          <div
            className={`${styles.dropdownTrigger} ${
              isPersonalCriteriaOpen ? styles.open : ""
            }`}
            onClick={() => setIsPersonalCriteriaOpen(!isPersonalCriteriaOpen)}
          >
            Personal Criteria
            <span className={styles.arrow}>▼</span>
          </div>

          {isPersonalCriteriaOpen && (
            <PersonalCriteriaDropdown
              values={filters.personalCriteria}
              onChange={handlePersonalCriteriaChange}
            />
          )}

          <div className={styles.dropdownTrigger}>
            Location Criteria
            <span className={styles.arrow}>▼</span>
          </div>

          <div className={styles.dropdownTrigger}>
            Financial Criteria
            <span className={styles.arrow}>▼</span>
          </div>

          <div className={styles.dropdownTrigger}>
            Marketing Criteria
            <span className={styles.arrow}>▼</span>
          </div>
        </div>

        <div className={styles.buttonSection}>
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
          <button className={styles.resetButton} onClick={handleReset}>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
