import React, { useState } from "react";
import Dropdown from "src/Common/Dropdown/Dropdown";
import styles from "./LeadsFilter.module.scss";

const LeadsFilter = ({ timeframeOptions, websiteOptions }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframeOptions[0]?.label || "");
  const [selectedWebsite, setSelectedWebsite] = useState(websiteOptions[0]?.label || "");

  return (
    <div className={styles.container}>
      <button 
        className={styles.filterButton}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={styles.filterIcon}>☰</span>
        Filters
      </button>

      {isExpanded && (
        <div className={styles.filterPanel}>
          <div className={styles.filterSection}>
            <label>Timeframe</label>
            <Dropdown
              options={timeframeOptions.map((option) => ({
                ...option,
                onClick: () => {
                  setSelectedTimeframe(option.label);
                  option.onClick?.();
                },
              }))}
              buttonText={selectedTimeframe}
              className={styles.dropdown}
            />
          </div>
          <div className={styles.filterSection}>
            <label>Website</label>
            <Dropdown
              options={websiteOptions.map((option) => ({
                ...option,
                onClick: () => {
                  setSelectedWebsite(option.label);
                  option.onClick?.();
                },
              }))}
              buttonText={selectedWebsite}
              className={styles.dropdown}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsFilter;
