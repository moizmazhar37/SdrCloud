import React, { useState } from "react";
import styles from "./SearchFilters.module.scss";
import Dropdown from "src/Common/Dropdown/Dropdown";

const SearchFilters = () => {
  const [filters, setFilters] = useState({
    dateRange: {
      start: "11/06/2024",
      end: "11/13/2024",
    },
    personalCriteria: "",
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

  const handleDropdownChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
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
      personalCriteria: "",
      locationCriteria: "",
      financialCriteria: "",
      marketingCriteria: "",
    });
  };

  const personalCriteriaOptions = [
    {
      label: "Personal Criteria",
      onClick: () => handleDropdownChange("personalCriteria", ""),
    },
    {
      label: "Option 1",
      onClick: () => handleDropdownChange("personalCriteria", "option1"),
    },
    {
      label: "Option 2",
      onClick: () => handleDropdownChange("personalCriteria", "option2"),
    },
  ];

  const locationCriteriaOptions = [
    {
      label: "Location Criteria",
      onClick: () => handleDropdownChange("locationCriteria", ""),
    },
    {
      label: "Option 1",
      onClick: () => handleDropdownChange("locationCriteria", "option1"),
    },
    {
      label: "Option 2",
      onClick: () => handleDropdownChange("locationCriteria", "option2"),
    },
  ];

  const financialCriteriaOptions = [
    {
      label: "Financial Criteria",
      onClick: () => handleDropdownChange("financialCriteria", ""),
    },
    {
      label: "Option 1",
      onClick: () => handleDropdownChange("financialCriteria", "option1"),
    },
    {
      label: "Option 2",
      onClick: () => handleDropdownChange("financialCriteria", "option2"),
    },
  ];

  const marketingCriteriaOptions = [
    {
      label: "Marketing Criteria",
      onClick: () => handleDropdownChange("marketingCriteria", ""),
    },
    {
      label: "Option 1",
      onClick: () => handleDropdownChange("marketingCriteria", "option1"),
    },
    {
      label: "Option 2",
      onClick: () => handleDropdownChange("marketingCriteria", "option2"),
    },
  ];

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
          <Dropdown
            options={personalCriteriaOptions}
            buttonText={filters.personalCriteria || "Personal Criteria"}
          />

          <Dropdown
            options={locationCriteriaOptions}
            buttonText={filters.locationCriteria || "Location Criteria"}
          />

          <Dropdown
            options={financialCriteriaOptions}
            buttonText={filters.financialCriteria || "Financial Criteria"}
          />

          <Dropdown
            options={marketingCriteriaOptions}
            buttonText={filters.marketingCriteria || "Marketing Criteria"}
          />
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
