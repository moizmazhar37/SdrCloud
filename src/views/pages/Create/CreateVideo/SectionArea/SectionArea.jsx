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
  const [sections, setSections] = useState([1, 2, 3, 4]);
  const [sectionData, setSectionData] = useState({});

  useEffect(() => {
    if (templateId && elementsList?.length > 0) {
      const sectionMap = {};
      elementsList.forEach((element) => {
        sectionMap[element.section_number] = element;
      });
      setSectionData(sectionMap);
    }
  }, [templateId, elementsList]);

  const addNewSection = () => {
    setSections([...sections, sections.length + 1]);
  };

  const handleSelect = (value, sectionNum) => {
    onSectionTypeChange(value, sectionNum);
  };

  const renderSection = (sectionNum) => {
    const hasData = sectionData[sectionNum];

    if (hasData) {
      return <SectionView sectionData={sectionData[sectionNum]} />;
    }

    return (
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
    );
  };

  return (
    <div className={styles.sectionAreaContainer}>
      <div className={styles.sectionsWrapper}>
        {sections.map((sectionNum) => (
          <div key={sectionNum} className={styles.sectionWrapper}>
            <div className={styles.sectionNumber}>{sectionNum}</div>
            <div className={styles.sectionMain}>
              {renderSection(sectionNum)}
            </div>
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
