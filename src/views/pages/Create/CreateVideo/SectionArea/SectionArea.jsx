import React, { useState } from "react";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import styles from "./SectionArea.module.scss";

const SectionArea = ({
  initialOptions,
  onSectionTypeChange,
  editable = true,
}) => {
  const [sections, setSections] = useState([1, 2, 3, 4]);

  const addNewSection = () => {
    setSections([...sections, sections.length + 1]);
  };

  const handleProgressClick = () => {
    console.log("Progress Overview clicked");
  };

  const handleSelect = (value, sectionNum) => {
    onSectionTypeChange(value, sectionNum);
  };

  return (
    <div className={styles.sectionAreaContainer}>
      <div className={styles.sectionsWrapper}>
        {sections.map((sectionNum) => (
          <div key={sectionNum} className={styles.sectionRow}>
            <div className={styles.sectionNumberWrapper}>
              <div className={styles.sectionNumber}>{sectionNum}</div>
            </div>
            <div className={styles.sectionContent}>
              <div className={styles.sectionLabel}>Section {sectionNum}</div>
              <CategoryDropdown
                options={initialOptions}
                buttonText="Choose type"
                onSelect={(value) => handleSelect(value, sectionNum)}
                allowAddNew={false}
                editable={editable}
              />
            </div>
          </div>
        ))}
      </div>

      <button className={styles.addSectionButton} onClick={addNewSection}>
        + Add New Section
      </button>

      <button className={styles.progressButton} onClick={handleProgressClick}>
        Progress Overview
      </button>
    </div>
  );
};

export default SectionArea;
