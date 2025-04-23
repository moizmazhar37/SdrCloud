import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import styles from "./Card.module.scss";

const Cards = ({ heading, amount, change, isClickable = false, onClick }) => {
  if (heading == null || amount == null) return null; // Ensure required props exist

  const hasChange = change !== undefined; // Check if change is provided
  const isPositive = change >= 0;

  const handleClick = () => {
    if (isClickable && typeof onClick === "function") {
      onClick(heading);
    }
  };

  return (
    <div
      className={`${styles.card} ${isClickable ? styles.clickable : ""}`}
      onClick={handleClick}
      role={isClickable ? "button" : undefined}
    >
      <h2 className={styles.heading}>{heading}</h2>

      <div className={styles.amount}>{amount}</div>

      {hasChange && ( // Only render if change prop exists
        <div className={styles.bottomRow}>
          <div className={styles.growthContainer}>
            <span
              className={`${styles.growthIcon} ${
                isPositive ? styles.positive : styles.negative
              }`}
            >
              {isPositive ? <FaArrowUp /> : <FaArrowDown />}
            </span>
            <span
              className={`${styles.growthValue} ${
                isPositive ? styles.positive : styles.negative
              }`}
            >
              {Math.abs(change)}%
            </span>
          </div>
          <span className={styles.growthText}>Than last period</span>
        </div>
      )}
    </div>
  );
};

export default Cards;
