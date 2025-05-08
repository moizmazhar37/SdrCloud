import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Trash2 } from "lucide-react";
import styles from "./CategoryDropdown.module.scss";
import CategoryModal from "../CategoryModal/CategoryModal";
import { getMenuPosition, shouldShowDeleteIcon } from "./helpers";

const CategoryDropdown = ({
  options = [],
  buttonText = "Select Category",
  className = "",
  onSelect,
  onDelete,
  allowAddNew = false,
  editable = true,
  onCategoryAdded = () => {}, // Add this callback for when a category is added
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(buttonText);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const triggerRef = useRef(null);

  useEffect(() => setDropdownOptions(options), [options]);
  useEffect(() => setSelectedOption(buttonText), [buttonText]);

  useEffect(() => {
    if (isExpanded) {
      setMenuPosition(getMenuPosition(triggerRef, dropdownOptions.length));
    }
  }, [isExpanded, dropdownOptions.length]);

  const handleAddCategory = (newCategory) => {
    // Set local state
    const tempNewCategory = { label: newCategory, value: newCategory };
    setDropdownOptions((prevOptions) => [...prevOptions, tempNewCategory]);
    setSelectedOption(newCategory);
    setIsExpanded(false);

    // Call the callback to inform parent component that a category was added
    // This will trigger refetch in the parent component
    onCategoryAdded(newCategory);
  };

  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
    setIsExpanded(false);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option.label);
    onSelect?.(option.value, option.label);
    setIsExpanded(false);
  };

  const handleDelete = (e, option) => {
    e.stopPropagation();
    if (onDelete && option.id) {
      onDelete(option.id);
    }
  };

  return (
    <div className={styles.container}>
      <button
        ref={triggerRef}
        onClick={() => editable && setIsExpanded(!isExpanded)}
        className={`${styles.trigger} ${!editable ? styles.disabled : ""}`}
        disabled={!editable}
      >
        {selectedOption}
        <svg
          className={`${styles.arrow} ${isExpanded ? styles.arrowOpen : ""} ${
            !editable ? styles.disabledArrow : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded &&
        editable &&
        createPortal(
          <div
            className={styles.menu}
            style={{
              position: "absolute",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              width: `${menuPosition.width}px`,
            }}
            role="menu"
          >
            {allowAddNew && (
              <div
                className={styles.addNewCategory}
                onClick={handleOpenCategoryModal}
              >
                + Add New Category
              </div>
            )}
            {dropdownOptions.map((option, index) => (
              <button
                key={option.id || index}
                className={styles.option}
                onClick={() => handleSelectOption(option)}
                role="menuitem"
              >
                <span className={styles.optionText}>{option.label}</span>
                {shouldShowDeleteIcon(option, allowAddNew, onDelete) && (
                  <Trash2
                    className={styles.deleteIcon}
                    size={16}
                    onClick={(e) => handleDelete(e, option)}
                  />
                )}
              </button>
            ))}
          </div>,
          document.body
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
