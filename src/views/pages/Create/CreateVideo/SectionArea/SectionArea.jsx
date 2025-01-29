import React, { useState, useEffect } from "react";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import SectionView from "./SectionView/SectionView";
import styles from "./SectionArea.module.scss";

const SectionArea = ({
  initialOptions,
  onSectionTypeChange,
  editable = true,
  templateId = null,
  elementsList = [],
}) => {
  const [sections, setSections] = useState([]);
  const [sectionData, setSectionData] = useState({});

  useEffect(() => {
    if (templateId && elementsList?.length > 0) {
      const sectionMap = elementsList.reduce((acc, element) => {
        acc[element.sequence] = element;
        return acc;
      }, {});

      const sortedSequences = Object.keys(sectionMap)
        .map(Number)
        .sort((a, b) => a - b);

      setSections(sortedSequences);
      setSectionData(sectionMap);
    } else {
      setSections([]);
      setSectionData({});
    }
  }, [templateId, elementsList]);

  const addNewSection = () => {
    setSections((prev) => [...prev, Math.max(...prev, 0) + 1]);
  };

  const handleSelect = (value, sectionNum) => {
    onSectionTypeChange(value, sectionNum);
  };

  const renderSection = (sequence) => {
    const currentSectionData = sectionData[sequence];

    if (elementsList?.length > 0 && currentSectionData) {
      return <SectionView sectionData={currentSectionData} />;
    }

    return (
      <div className={styles.sectionContent}>
        <div className={styles.sectionLabel}>Section {sequence}</div>
        <CategoryDropdown
          options={initialOptions}
          buttonText="Choose type"
          onSelect={(value) => handleSelect(value, sequence)}
          allowAddNew={false}
          editable={editable}
        />
      </div>
    );
  };

  return (
    <div className={styles.sectionAreaContainer}>
      <div className={styles.sectionsWrapper}>
        {sections.map((sequence) => (
          <div key={`section-${sequence}`} className={styles.sectionWrapper}>
            <div className={styles.sectionNumber}>{sequence}</div>
            <div className={styles.sectionMain}>{renderSection(sequence)}</div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button onClick={addNewSection} className={styles.addSectionButton}>
          + Add New Section
        </button>
        <button
          onClick={() => console.log("Progress Overview clicked")}
          className={styles.progressButton}
        >
          Progress Overview
        </button>
      </div>
    </div>
  );
};

export default SectionArea;
