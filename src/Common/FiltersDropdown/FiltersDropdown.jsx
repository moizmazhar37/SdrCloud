import React, { useState } from 'react';
import styles from "./FiltersDropdown.module.scss";
import Dropdown from "src/Common/Dropdown/Dropdown";

const FiltersDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState('not-clicked');

  const dropdownOptions = [
    { label: "Monthly", onClick: () => console.log("Monthly selected") },
    { label: "Weekly", onClick: () => console.log("Weekly selected") },
    { label: "Daily", onClick: () => console.log("Daily selected") },
  ];

  // Modified toggle function with console.log for debugging
  const toggleDropdown = () => {
    console.log('Current isOpen:', isOpen);
    setIsOpen(prevState => !prevState);
    console.log('Toggled to:', !isOpen);
  };

  // Add click handler directly to button
  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleDropdown();
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.filtersButton} 
        onClick={handleButtonClick}
        type="button"
      >
        <span className={styles.filterIcon}>≡</span>
        Filters
      </button>
      
      {isOpen && (
        <div className={styles.dropdown} onClick={e => e.stopPropagation()}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Timeframe</h2>
            <div className={styles.dropdownWrapper}>
              <Dropdown 
                options={dropdownOptions}
                buttonText="Monthly"
              />
            </div>
          </div>
          
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Response</h2>
            <div className={styles.responseOptions}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="response"
                  value="clicked"
                  checked={response === 'clicked'}
                  onChange={(e) => setResponse(e.target.value)}
                  className={styles.radioInput}
                />
                <span className={styles.customRadio}></span>
                Clicked
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="response"
                  value="not-clicked"
                  checked={response === 'not-clicked'}
                  onChange={(e) => setResponse(e.target.value)}
                  className={styles.radioInput}
                />
                <span className={styles.customRadio}></span>
                Not Clicked
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersDropdown;