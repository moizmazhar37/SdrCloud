import React from "react";
import styles from "./TemplateSection.module.scss";

const TemplateSection = ({ templates = [], selectedId, onSelect }) => {
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
                Section {index + 1} | {template.name || "Untitled"}
              </div>
              <div className={styles.scroll}>
                Scroll - {template.scroll ? "Yes" : "No"}
              </div>
            </div>
            <button className={styles.viewButton}>View</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TemplateSection;
