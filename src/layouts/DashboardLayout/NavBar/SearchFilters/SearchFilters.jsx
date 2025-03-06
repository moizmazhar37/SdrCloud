import React, { useState, useEffect } from "react";
import styles from "./SearchFilters.module.scss";
import PersonalCriteriaDropdown from "./PersonalCriteriaDropdown/PersonalCriteriaDropdown";
import LocationCriteria from "./LocationCriteria/LocationCriteria";
import FinancialCriteria from "./FinancialCriteria/FinancialCriteria";
import MarketingCriteria from "./MarketingCriteria/MarketingCriteria";
import { transformFilters, resetFiltersState } from "./helpers";

const SearchFilters = ({ onSearch, initialFilters = null }) => {
  const [isPersonalCriteriaOpen, setIsPersonalCriteriaOpen] = useState(false);
  const [isLocationCriteriaOpen, setIsLocationCriteriaOpen] = useState(false);
  const [isFinancialCriteriaOpen, setIsFinancialCriteriaOpen] = useState(false);
  const [isMarketingCriteriaOpen, setIsMarketingCriteriaOpen] = useState(false);

  // Use initialFilters if provided, otherwise use default state
  const [filters, setFilters] = useState(initialFilters || resetFiltersState());

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
    console.log("Raw Filters==", filters);

    const transformedFilters = transformFilters(filters);
    console.log("TRANSformed Filters==", transformedFilters);
    if (onSearch) {
      onSearch(transformedFilters);
    }
  };

  const handleReset = () => {
    setFilters(resetFiltersState());
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

          <div
            className={`${styles.dropdownTrigger} ${
              isFinancialCriteriaOpen ? styles.open : ""
            }`}
            onClick={() => setIsFinancialCriteriaOpen(!isFinancialCriteriaOpen)}
          >
            Financial Criteria
            <span className={styles.arrow}>▼</span>
          </div>
          {isFinancialCriteriaOpen && (
            <FinancialCriteria
              values={filters.financialCriteria}
              onChange={handleFinancialCriteriaChange}
            />
          )}

          <div
            className={`${styles.dropdownTrigger} ${
              isMarketingCriteriaOpen ? styles.open : ""
            }`}
            onClick={() => setIsMarketingCriteriaOpen(!isMarketingCriteriaOpen)}
          >
            Marketing Criteria
            <span className={styles.arrow}>▼</span>
          </div>
          {isMarketingCriteriaOpen && (
            <MarketingCriteria
              values={filters.marketingCriteria}
              onChange={handleMarketingCriteriaChange}
            />
          )}
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
