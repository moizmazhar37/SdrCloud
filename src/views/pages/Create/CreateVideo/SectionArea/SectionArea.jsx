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

  // Manage sections and section data based on the templateId and elementsList
  useEffect(() => {
    if (templateId && elementsList?.length > 0) {
      const sectionMap = {};
      elementsList.forEach((element) => {
        sectionMap[element.sequence] = element;
      });

      // Only update sectionData if it has changed
      setSectionData((prev) => {
        const prevKeys = Object.keys(prev || {}).join();
        const currentKeys = Object.keys(sectionMap || {}).join();
        return prevKeys === currentKeys ? prev : sectionMap;
      });

      let sortedSequences = Object.keys(sectionMap)
        .map(Number)
        .sort((a, b) => a - b);

      // Only update sections if they have changed
      setSections((prev) =>
        JSON.stringify(prev) === JSON.stringify(sortedSequences)
          ? prev
          : sortedSequences
      );
    } else {
      // Set sections to empty array if no elements are present
      setSections([]);
    }
  }, [templateId, elementsList]);

  // Add a new section
  const addNewSection = () => {
    setSections((prev) => [...prev, prev.length + 1]);
  };

  // Handle selecting a type for a section
  const handleSelect = (value, sectionNum) => {
    onSectionTypeChange(value, sectionNum);
  };

  // Render a single section
  const renderSection = (sequence) => {
    const hasData = sectionData[sequence];

    if (hasData) {
      return <SectionView sectionData={sectionData[sequence]} />;
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
          <div key={sequence} className={styles.sectionWrapper}>
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
