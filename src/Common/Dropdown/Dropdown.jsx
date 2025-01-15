import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./dorpdown.module.scss";

const Dropdown = ({ options = [], buttonText = "Actions", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  // Calculate and update menu position when dropdown opens
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      // Calculate initial position
      let top = triggerRect.bottom + scrollTop;
      let left = triggerRect.left + scrollLeft;

      // Check if menu would go off screen to the right
      if (left + 112 > window.innerWidth) {
        // 112px is the menu width (7rem)
        left = triggerRect.right + scrollLeft - 112;
      }

      // Check if menu would go off screen at the bottom
      const menuHeight = 40 * options.length; // Approximate height per option
      if (top + menuHeight > window.innerHeight + scrollTop) {
        // Position menu above the trigger
        top = triggerRect.top + scrollTop - menuHeight;
      }

      setMenuPosition({ top, left });
    }
  }, [isOpen, options.length]);

  return (
    <div className={styles.container}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.trigger}
      >
        {buttonText}
        <svg
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
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

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className={styles.menu}
            style={{
              position: "absolute",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <button
                key={index}
                className={styles.option}
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Dropdown;
