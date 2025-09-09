import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from "./FiltersDropdown.module.scss";
import Dropdown from "src/Common/Dropdown/Dropdown";

const FiltersDropdown = ({ options = [], setIsViewed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(true); // Default to checked
  const [notClicked, setNotClicked] = useState(true); // Default to checked
  const [selectedTimeframe, setSelectedTimeframe] = useState('Monthly');

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

  const handleCheckboxChange = (type) => {
    if (type === 'clicked') {
      setClicked(!clicked);
    } else {
      setNotClicked(!notClicked);
    }

    const nextClickedState = type === 'clicked' ? !clicked : clicked;
    const nextNotClickedState = type === 'not-clicked' ? !notClicked : notClicked;

    if (setIsViewed) {
      if (nextClickedState && !nextNotClickedState) {
        setIsViewed(true);
      } else if (!nextClickedState && nextNotClickedState) {
        setIsViewed(false);
      } else {
        setIsViewed(null);
      }
    }
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
                  type="checkbox"
                  checked={clicked}
                  onChange={() => handleCheckboxChange('clicked')}
                  className={styles.radioInput}
                />
                <span className={styles.customRadio}></span>
                Clicked
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="checkbox"
                  checked={notClicked}
                  onChange={() => handleCheckboxChange('not-clicked')}
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
  ),
  setIsViewed: PropTypes.func,
};

FiltersDropdown.defaultProps = {
  options: [],
  setIsViewed: null,
};

export default FiltersDropdown;
