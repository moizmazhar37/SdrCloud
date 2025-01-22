import React from "react";
import styles from "./SectionView.module.scss";

const SectionView = ({ sectionData }) => {
  const { duration, scroll, audio_embedded, section_number } = sectionData;

  return (
    <div className={styles.viewCard}>
      <div className={styles.cardHeader}>
        <button className={styles.viewButton}>View</button>
      </div>
      <div className={styles.metaInfo}>
        <span className={styles.duration}>
          <ClockIcon />
          {duration}sec
        </span>
        <span>Scroll - {scroll ? "Yes" : "No"}</span>
        <span>Audio - {audio_embedded ? "Yes" : "No"}</span>
      </div>
    </div>
  );
};

const ClockIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M12 6v6l4 2" strokeWidth="2" />
  </svg>
);

export default SectionView;
