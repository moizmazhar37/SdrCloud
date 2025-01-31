import React, { useState, useCallback } from "react";
import styles from "./Header.module.scss";
import CategoryDropdown from "src/views/pages/Create/CreateVideo/CategoryDropdown/CategoryDropdown";
import useSaveHeader from "../../Hooks/useSaveHeader";
import useHvoSections from "../../Hooks/useGetHvoSections";

const Header = ({
  dynamicOptions,
  handleCategorySelect,
  templateId,
  sequence,
  logo,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const triggerRefetch = useCallback(() => {
    setRefetchTrigger((prev) => !prev);
  }, []);

  const { saveHeader, loading } = useSaveHeader(triggerRefetch);
  const { data: sectionData } = useHvoSections(templateId, refetchTrigger);

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
    handleCategorySelect(option);
  };

  const handleSave = async () => {
    await saveHeader({
      hvoTemplateId: templateId,
      sequence: sequence,
      headerLogo: selectedOption?.value || "",
      companyLogo: logo || "",
    });
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerSection}>
        <h2 className={styles.sectionTitle}>Header | Section 1</h2>

        <div className={styles.logoSection}>
          <div className={styles.logoUpload}>
            <h3 className={styles.logoTitle}>Your Logo (Top Left)</h3>
            <div className={styles.logoPlaceholder}>
              {logo ? (
                <img
                  src={logo}
                  alt="Uploaded Logo"
                  className={styles.logoPreview}
                />
              ) : (
                <p>No Logo Uploaded</p>
              )}
            </div>
          </div>

          <div className={styles.dynamicLogo}>
            <h3 className={styles.logoTitle}>Optional: Dynamic Logo</h3>
            <CategoryDropdown
              options={dynamicOptions}
              buttonText="Select None"
              onSelect={handleDropdownSelect}
              allowAddNew={false}
            />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button className={styles.nextButton}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
