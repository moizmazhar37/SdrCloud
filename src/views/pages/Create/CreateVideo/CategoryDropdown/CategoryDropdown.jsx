import React, { useState } from "react";
import styles from "./CategoryDropdown.module.scss";
import CategoryModal from "../CategoryModal/CategoryModal";

const CategoryDropdown = ({ options, allowAddNew = false }) => {
  const [dropdownOptions, setDropdownOptions] = useState(options);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleAddCategory = (newCategory) => {
    setDropdownOptions((prevOptions) => [...prevOptions, newCategory]);
    setSelectedOption(newCategory);
    setIsExpanded(false);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsExpanded(false);
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.dropdownHeader}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {selectedOption || "Select a Category"}
        <span
          className={`${styles.arrow} ${isExpanded ? styles.expanded : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#858585"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>

      {isExpanded && (
        <div className={styles.dropdownOptions}>
          {allowAddNew && (
            <div
              className={styles.addNewCategory}
              onClick={() => setIsCategoryModalOpen(true)}
            >
              + Add New Category
            </div>
          )}

          {dropdownOptions.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownOption}
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
};

export default CategoryDropdown;
