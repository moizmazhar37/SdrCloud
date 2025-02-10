import React, { useState } from "react";
import styles from "./SearchFilters.module.scss";
import PersonalCriteriaDropdown from "./PersonalCriteriaDropdown/PersonalCriteriaDropdown";
import LocationCriteria from "./LocationCriteria/LocationCriteria";
// import FinancialCriteria from "./FinancialCriteria/FinancialCriteria";
// import MarketingCriteria from "./MarketingCriteria/MarketingCriteria";

const SearchFilters = () => {
  // Dropdown state management
  const [isPersonalCriteriaOpen, setIsPersonalCriteriaOpen] = useState(false);
  const [isLocationCriteriaOpen, setIsLocationCriteriaOpen] = useState(false);
  const [isFinancialCriteriaOpen, setIsFinancialCriteriaOpen] = useState(false);
  const [isMarketingCriteriaOpen, setIsMarketingCriteriaOpen] = useState(false);

  // Main filters state
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
    locationCriteria: {
      state: { checked: false, value: "" },
      city: { checked: false, value: "" },
      zipCode: { checked: false, value: "" },
    },
    financialCriteria: {
      income: { checked: false, value: "" },
      creditScore: { checked: false, value: "" },
      investment: { checked: false, value: "" },
    },
    marketingCriteria: {
      campaign: { checked: false, value: "" },
      source: { checked: false, value: "" },
      preference: { checked: false, value: "" },
    },
  });

  // Event handlers
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

  const handleLocationCriteriaChange = (newValues) => {
    setFilters({
      ...filters,
      locationCriteria: newValues,
    });
  };

  const handleFinancialCriteriaChange = (newValues) => {
    setFilters({
      ...filters,
      financialCriteria: newValues,
    });
  };

  const handleMarketingCriteriaChange = (newValues) => {
    setFilters({
      ...filters,
      marketingCriteria: newValues,
    });
  };

  const handleSearch = () => {
    console.log("Current filters:", filters);
    // Add your search logic here
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
      locationCriteria: {
        state: { checked: false, value: "" },
        city: { checked: false, value: "" },
        zipCode: { checked: false, value: "" },
      },
      financialCriteria: {
        income: { checked: false, value: "" },
        creditScore: { checked: false, value: "" },
        investment: { checked: false, value: "" },
      },
      marketingCriteria: {
        campaign: { checked: false, value: "" },
        source: { checked: false, value: "" },
        preference: { checked: false, value: "" },
      },
    });

    // Reset all dropdowns to closed state
    setIsPersonalCriteriaOpen(false);
    setIsLocationCriteriaOpen(false);
    setIsFinancialCriteriaOpen(false);
    setIsMarketingCriteriaOpen(false);
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
          {/* Personal Criteria Dropdown */}
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

          {/* Location Criteria Dropdown */}
          <div
            className={`${styles.dropdownTrigger} ${
              isLocationCriteriaOpen ? styles.open : ""
            }`}
            onClick={() => setIsLocationCriteriaOpen(!isLocationCriteriaOpen)}
          >
            Location Criteria
            <span className={styles.arrow}>▼</span>
          </div>
          {isLocationCriteriaOpen && (
            <LocationCriteria
              values={filters.locationCriteria}
              onChange={handleLocationCriteriaChange}
            />
          )}

          {/* Financial Criteria Dropdown */}
          <div
            className={`${styles.dropdownTrigger} ${
              isFinancialCriteriaOpen ? styles.open : ""
            }`}
            onClick={() => setIsFinancialCriteriaOpen(!isFinancialCriteriaOpen)}
          >
            Financial Criteria
            <span className={styles.arrow}>▼</span>
          </div>

          {/* Marketing Criteria Dropdown */}
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
