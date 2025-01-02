import React from 'react';
import styles from './Card.module.scss';

const Cards = ({ heading, amount, growthText, label, labelType }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>{heading}</h2>
      
      <div className={styles.amount}>
        {amount}
      </div>
      
      <div className={styles.bottomRow}>
        <span className={`${styles.label} ${styles[labelType]}`}>{label}</span>
        <span className={styles.growthText}>{growthText}</span>
      </div>
    </div>
  );
};

export default Cards;
