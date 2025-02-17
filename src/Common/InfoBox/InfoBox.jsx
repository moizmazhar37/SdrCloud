import React, { useState } from "react";
import styles from "./InfoBox.module.scss";

const InfoBox = ({ text }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className={styles.infoBoxContainer}>
      <div
        className={styles.infoIcon}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className={styles.infoCharacter}>i</span>
      </div>
      {isTooltipVisible && (
        <div className={styles.tooltip}>
          <p className={styles.tooltipText}>{text}</p>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
