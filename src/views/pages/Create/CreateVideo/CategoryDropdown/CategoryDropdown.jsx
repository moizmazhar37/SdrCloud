import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Trash2 } from "lucide-react";
import styles from "./CategoryDropdown.module.scss";
import CategoryModal from "../CategoryModal/CategoryModal";

const PROTECTED_CATEGORIES = ["ENT", "MM", "SMB", "Startup"];

const CategoryDropdown = ({
  options = [],
  buttonText = "Select Category",
  className = "",
  onSelect,
  onDelete,
  allowAddNew = false,
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

  useEffect(() => {
    setDropdownOptions(options);
  }, [options]);

  useEffect(() => {
    if (isExpanded && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      let top = triggerRect.bottom + scrollTop;
      let left = triggerRect.left + scrollLeft;
      const width = triggerRect.width;

      if (left + width > window.innerWidth) {
        left = triggerRect.right + scrollLeft - width;
      }

      const menuHeight = 40 * dropdownOptions.length;
      if (top + menuHeight > window.innerHeight + scrollTop) {
        top = triggerRect.top + scrollTop - menuHeight;
      }

      setMenuPosition({ top, left, width });
    }
  }, [isExpanded, dropdownOptions.length]);

  const handleAddCategory = (newCategory) => {
    setDropdownOptions((prevOptions) => [
      ...prevOptions,
      { label: newCategory, value: newCategory },
    ]);
    setSelectedOption(newCategory);
    setIsExpanded(false);
  };

  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
    setIsExpanded(false);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option.label);
    onSelect(option.value);
    setIsExpanded(false);
  };

  const handleDelete = (e, option) => {
    e.stopPropagation();
    if (onDelete && option.id) {
      onDelete(option.id);
    }
  };

  const shouldShowDeleteIcon = (option) => {
    return (
      allowAddNew && !PROTECTED_CATEGORIES.includes(option.label) && onDelete
    );
  };

  return (
    <div className={styles.container}>
      <button
        ref={triggerRef}
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.trigger}
      >
        {selectedOption}
        <svg
          className={`${styles.arrow} ${isExpanded ? styles.arrowOpen : ""}`}
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
                {shouldShowDeleteIcon(option) && (
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
