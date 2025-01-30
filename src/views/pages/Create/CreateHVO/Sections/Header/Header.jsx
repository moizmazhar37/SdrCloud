import React from "react";
import styles from "./Header.module.scss";
import CategoryDropdown from "src/views/pages/Create/CreateVideo/CategoryDropdown/CategoryDropdown";

const Header = ({ dynamicOptions, handleCategorySelect }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerSection}>
        <h2 className={styles.sectionTitle}>Header | Section 1</h2>

        <div className={styles.logoSection}>
          <div className={styles.logoUpload}>
            <h3 className={styles.logoTitle}>Your Logo (Top Left)</h3>
            <div className={styles.logoPlaceholder}></div>
          </div>

          <div className={styles.dynamicLogo}>
            <h3 className={styles.logoTitle}>Optional: Dynamic Logo</h3>
            <CategoryDropdown
              options={dynamicOptions}
              buttonText="Select None"
              onSelect={handleCategorySelect}
              allowAddNew={false}
            />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.saveButton}>Save</button>
          <button className={styles.nextButton}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
