import React, { useState, useCallback, useEffect } from "react";
import styles from "./Header.module.scss";
import CategoryDropdown from "src/views/pages/Create/CreateVideo/CategoryDropdown/CategoryDropdown";
import useSaveHeader from "../../Hooks/Header/useSaveHeader";
import useUpdateHeader from "../../Hooks/Header/useUpdateHeader";

const Header = ({
  dynamicOptions,
  handleCategorySelect,
  templateId,
  sequence,
  logo,
  onSectionSave,
  onClose,
  initialData,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Initialize state based on initialData
  useEffect(() => {
    if (initialData) {
      setIsEditMode(true);
      if (initialData.header_logo) {
        const matchingOption = dynamicOptions.find(
          (option) => option.value === initialData.header_logo
        );
        if (matchingOption) {
          setSelectedOption(matchingOption);
        }
      }
    }
  }, [initialData, dynamicOptions]);

  const handleSaveSuccess = useCallback(() => {
    if (onSectionSave) {
      onSectionSave();
    }
    if (onClose) {
      onClose();
    }
  }, [onSectionSave, onClose]);

  const { saveHeader, loading: saveLoading } = useSaveHeader(handleSaveSuccess);
  const { updateHeader, loading: updateLoading } =
    useUpdateHeader(handleSaveSuccess);

  const handleDropdownSelect = (option) => {
    setSelectedOption(`[${option}]`);
    handleCategorySelect(option);
  };

  const handleSave = async () => {
    if (isEditMode && initialData) {
      await updateHeader(initialData.id, {
        sequence: sequence,
        headerLogo: selectedOption?.value || "",
        companyLogo: logo || "",
      });
    } else {
      await saveHeader({
        hvoTemplateId: templateId,
        sequence: sequence,
        headerLogo: selectedOption?.value || "",
        companyLogo: logo || "",
      });
    }
  };

  const loading = isEditMode ? updateLoading : saveLoading;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerSection}>
        <h2 className={styles.sectionTitle}>Header | Section {sequence}</h2>

        <div className={styles.logoSection}>
          <div className={styles.logoUpload}>
            <h3 className={styles.logoTitle}>Your Logo (Top Left)</h3>
            <div className={styles.logoPlaceholder}>
              {logo || initialData?.company_logo ? (
                <img
                  src={logo || initialData?.company_logo}
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
              buttonText={selectedOption ? "Change Selection" : "Select None"}
              onSelect={handleDropdownSelect}
              allowAddNew={false}
              initialValue={selectedOption}
            />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : isEditMode ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
