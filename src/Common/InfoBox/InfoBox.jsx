import React, { useState, useRef, useEffect } from "react";
import styles from "./InfoBox.module.scss";

const InfoBox = ({ text }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top - 55,
        left: rect.left + rect.width / 2,
      });
    }
  }, [isTooltipVisible]);

  return (
    <div
      className={styles.infoBoxContainer}
      ref={containerRef}
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      <div className={styles.infoIcon}>
        <span className={styles.infoCharacter}>i</span>
      </div>
      {isTooltipVisible && (
        <div
          className={styles.tooltip}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <p className={styles.tooltipText}>{text}</p>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
