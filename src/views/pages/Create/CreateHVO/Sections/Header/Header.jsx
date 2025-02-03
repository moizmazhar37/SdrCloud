import React, { useState, useCallback } from "react";
import styles from "./Header.module.scss";
import CategoryDropdown from "src/views/pages/Create/CreateVideo/CategoryDropdown/CategoryDropdown";
import useSaveHeader from "../../Hooks/Header/useSaveHeader";

const Header = ({
  dynamicOptions,
  handleCategorySelect,
  templateId,
  sequence,
  logo,
  onSectionSave,
  initialData,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSaveSuccess = useCallback(() => {
    if (onSectionSave) {
      onSectionSave();
    }
  }, [onSectionSave]);

  const { saveHeader, loading } = useSaveHeader(handleSaveSuccess);

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
        </div>
      </div>
    </div>
  );
};

export default Header;
