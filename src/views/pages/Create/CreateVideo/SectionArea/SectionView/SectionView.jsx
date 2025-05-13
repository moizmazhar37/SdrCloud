import React from "react";
import styles from "./SectionView.module.scss";

const SectionView = ({ sectionData, type, onViewSection }) => {
  const { duration, scroll, audio_embedded, sequence, section_name } =
    sectionData;

  const handleViewClick = () => {
    if (onViewSection) {
      onViewSection(sequence, section_name);
    }
  };

  return (
    <div className={styles.viewCard}>
      <div className={styles.cardHeader}>
        <span className={styles.sectionName}>
          Section {sequence} | {section_name}
        </span>
        <button className={styles.viewButton} onClick={handleViewClick}>
          View
        </button>
      </div>
      <div className={styles.metaInfo}>
        <span>Scroll - {scroll ? "Yes" : "No"}</span>
        {type !== "hvo" && (
          <>
            <span className={styles.duration}>
              <ClockIcon />
              {duration}sec
            </span>
            <span>Audio - {audio_embedded ? "Yes" : "No"}</span>
          </>
        )}
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
