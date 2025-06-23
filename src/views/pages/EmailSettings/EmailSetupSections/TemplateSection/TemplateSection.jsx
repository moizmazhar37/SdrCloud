import React from "react";
import styles from "./TemplateSection.module.scss";

const TemplateSection = ({ templates = [], selectedId, onSelect, onAddNew }) => {
  return (
    <div className={styles.templateSection}>
      {templates.length === 0 ? (
        <div className={styles.noTemplates}>No templates saved yet.</div>
      ) : (
        templates.map((template, index) => (
          <div
            key={template.id || index}
            className={`${styles.card} ${selectedId === template.id ? styles.active : ""}`}
            onClick={() => onSelect(template.id)}
          >
            <div className={styles.index}>{index + 1}</div>
            <div className={styles.details}>
              <div className={styles.title}>
                Reminder {index + 1} | {template.subject || "Untitled"}
              </div>
            </div>
            <button className={styles.viewButton}>View</button>
          </div>
        ))
      )}

      {templates.length > 0 && (
        <div className={styles.addNewTemplateButtonWrapper}>
          <button className={styles.addNewTemplateButton} onClick={onAddNew}>
            + Add New Section
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateSection;
