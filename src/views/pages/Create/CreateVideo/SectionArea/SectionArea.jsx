import React, { useState } from "react";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import ImageUpload from "../CategoryForm/ImageUpload/ImageUpload";
import styles from "./SectionArea.module.scss";

const SectionArea = ({ initialOptions }) => {
  const [sections, setSections] = useState([1, 2, 3, 4]);

  const addNewSection = () => {
    setSections([...sections, sections.length + 1]);
  };

  const handleProgressClick = () => {
    console.log("Progress Overview clicked");
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
                options={initialOptions.map((option) => ({
                  label: option,
                  value: option.toLowerCase().replace(/\s+/g, "_"),
                }))}
                buttonText="Choose type"
                onSelect={() => {}}
                allowAddNew={false}
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
