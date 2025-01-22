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
  //showing sections by sequence number
  useEffect(() => {
    if (templateId && elementsList?.length > 0) {
      const sectionMap = {};
      elementsList.forEach((element) => {
        sectionMap[element.sequence] = element;
      });
      setSectionData(sectionMap);

      // Extract and sort sequences
      let sortedSequences = Object.keys(sectionMap)
        .map(Number)
        .sort((a, b) => a - b); // Sort sequences numerically

      // Ensure at least 4 sections
      while (sortedSequences.length < 4) {
        sortedSequences.push(sortedSequences.length + 1);
      }
      setSections(sortedSequences);
    } else {
      setSections([1, 2, 3, 4]);
    }
  }, [templateId, elementsList]);

  const addNewSection = () => {
    setSections([...sections, sections.length + 1]);
  };

  const handleSelect = (value, sectionNum) => {
    onSectionTypeChange(value, sectionNum);
  };

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
