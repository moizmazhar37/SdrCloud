import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from "./FiltersDropdown.module.scss";
import Dropdown from "src/Common/Dropdown/Dropdown";

const FiltersDropdown = ({ options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState('not-clicked');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Monthly');

  // options array in the format expected by Dropdown component
  const timeframeOptions = options.map(option => ({
    label: option.label,
    onClick: () => {
      option.onClick();
      setSelectedTimeframe(option.label);
    }
  }));

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

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
            <div className={styles.dropdownWrapper}>
              <Dropdown 
                options={timeframeOptions}
                buttonText={selectedTimeframe}
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

FiltersDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  )
};

FiltersDropdown.defaultProps = {
  options: []
};

export default FiltersDropdown;