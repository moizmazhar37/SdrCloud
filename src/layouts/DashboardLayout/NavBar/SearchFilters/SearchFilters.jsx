import React, { useState } from "react";
import styles from "./SearchFilters.module.scss";
import PersonalCriteriaDropdown from "./PersonalCriteriaDropdown/PersonalCriteriaDropdown";
import LocationCriteria from "./LocationCriteria/LocationCriteria";
import FinancialCriteria from "./FinancialCriteria/FinancialCriteria";
import MarketingCriteria from "./MarketingCriteria/MarketingCriteria";

const SearchFilters = () => {
  // Dropdown state management
  const [isPersonalCriteriaOpen, setIsPersonalCriteriaOpen] = useState(false);
  const [isLocationCriteriaOpen, setIsLocationCriteriaOpen] = useState(false);
  const [isFinancialCriteriaOpen, setIsFinancialCriteriaOpen] = useState(false);
  const [isMarketingCriteriaOpen, setIsMarketingCriteriaOpen] = useState(false);

  // Initial filters state with simplified data structure
  const [filters, setFilters] = useState({
    dateRange: {
      start: "",
      end: "",
    },
    personalCriteria: {
      name: {
        checked: false,
        value: {
          first: "",
          last: "",
        },
      },
      email: {
        checked: false,
        value: "",
      },
      gender: {
        checked: false,
        value: "",
      },
      ageRange: {
        checked: false,
        value: "",
      },
      married: {
        checked: false,
      },
      hasChildren: {
        checked: false,
      },
    },
    locationCriteria: {
      state: {
        checked: false,
        value: "",
      },
      city: {
        checked: false,
        value: "",
      },
      zipCode: {
        checked: false,
        value: "",
      },
    },
    financialCriteria: {
      netWorth: {
        checked: false,
        value: "",
      },
      income: {
        checked: false,
        value: "",
      },
      ownHouse: {
        checked: false,
      },
    },
    marketingCriteria: {
      domains: {
        checked: false,
        value: "",
      },
      referralSource: {
        checked: false,
        value: "",
      },
      keyword: {
        checked: false,
        value: "",
      },
      pageViewed: {
        checked: false,
        value: "",
      },
    },
  });

  const transformFilters = (filters) => {
    const today = new Date().toISOString().split("T")[0];

    const transformed = {
      startDate: filters.dateRange.start || null,
      endDate: filters.dateRange.end || today,

      // Personal Criteria
      firstName: filters.personalCriteria.name?.checked
        ? filters.personalCriteria.name.value.first
        : null,
      lastName: filters.personalCriteria.name?.checked
        ? filters.personalCriteria.name.value.last
        : null,
      email: filters.personalCriteria.email?.checked
        ? filters.personalCriteria.email.value
        : null,
      gender: filters.personalCriteria.gender?.checked
        ? filters.personalCriteria.gender.value
        : null,
      hasChildren: filters.personalCriteria.hasChildren?.checked || null,
      married: filters.personalCriteria.married?.checked || null,

      // Location Criteria
      state: filters.locationCriteria.state?.checked
        ? filters.locationCriteria.state.value
        : null,
      city: filters.locationCriteria.city?.checked
        ? filters.locationCriteria.city.value
        : null,
      zipCode: filters.locationCriteria.zipCode?.checked
        ? filters.locationCriteria.zipCode.value
        : null,

      // Marketing Criteria
      domains: filters.marketingCriteria.domains?.checked
        ? filters.marketingCriteria.domains.value
        : null,
      referralSource: filters.marketingCriteria.referralSource?.checked
        ? filters.marketingCriteria.referralSource.value
        : null,
      keyword: filters.marketingCriteria.keyword?.checked
        ? filters.marketingCriteria.keyword.value
        : null,
      pageViewed: filters.marketingCriteria.pageViewed?.checked
        ? filters.marketingCriteria.pageViewed.value
        : null,

      // Financial Criteria
      netWorth: filters.financialCriteria.netWorth?.checked
        ? filters.financialCriteria.netWorth.value
        : null,
      annualIncome: filters.financialCriteria.income?.checked
        ? filters.financialCriteria.income.value
        : null,
      ownHouse: filters.financialCriteria.ownHouse?.checked || null,
    };

    return transformed;
  };

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
    console.log("Original filters:", filters);
    const transformedFilters = transformFilters(filters);
    console.log("Transformed filters:", transformedFilters);
    // Add your search logic here
  };

  const handleReset = () => {
    setFilters({
      dateRange: {
        start: "",
        end: "",
      },
      personalCriteria: {
        name: {
          checked: false,
          value: {
            first: "",
            last: "",
          },
        },
        email: {
          checked: false,
          value: "",
        },
        gender: {
          checked: false,
          value: "",
        },
        ageRange: {
          checked: false,
          value: "",
        },
        married: {
          checked: false,
        },
        hasChildren: {
          checked: false,
        },
      },
      locationCriteria: {
        state: {
          checked: false,
          value: "",
        },
        city: {
          checked: false,
          value: "",
        },
        zipCode: {
          checked: false,
          value: "",
        },
      },
      financialCriteria: {
        netWorth: {
          checked: false,
          value: "",
        },
        income: {
          checked: false,
          value: "",
        },
        ownHouse: {
          checked: false,
        },
      },
      marketingCriteria: {
        domains: {
          checked: false,
          value: "",
        },
        referralSource: {
          checked: false,
          value: "",
        },
        keyword: {
          checked: false,
          value: "",
        },
        pageViewed: {
          checked: false,
          value: "",
        },
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
