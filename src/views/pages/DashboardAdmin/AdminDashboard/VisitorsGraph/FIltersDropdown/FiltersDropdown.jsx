import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./FiltersDropdown.module.scss";
import Dropdown from "src/Common/Dropdown/Dropdown";

const FiltersDropdown = ({ options, type, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleDropdown();
  };

  // Create modified options with wrapped onClick handlers
  const wrappedOptions = options.map((option) => ({
    ...option,
    onClick: () => {
      if (option.onClick) option.onClick();
      setSelectedOption(option.label);
      if (onOptionSelect) onOptionSelect(option.label);
      setIsOpen(false);
    },
  }));

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

      {isOpen && type === "Dropdown" && (
        <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
          <div className={styles.dropdownWrapper}>
            <Dropdown options={wrappedOptions} buttonText="Select Website" />
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
      onClick: PropTypes.func,
    })
  ),
  type: PropTypes.string,
  onOptionSelect: PropTypes.func,
};

FiltersDropdown.defaultProps = {
  options: [],
  type: "Dropdown",
  onOptionSelect: null,
};

export default FiltersDropdown;
