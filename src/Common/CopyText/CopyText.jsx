import React from "react";
import { Copy } from "lucide-react";
import styles from "./CopyText.module.scss";
import InfoBox from "../InfoBox/InfoBox";

const CopyText = ({ fields = [] }) => {
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(`[${text}]`);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Copy to Add Dynamic Fields{" "}
        <InfoBox text={"Click to copy dynamic fields"} />
      </div>
      <div className={styles.fieldList}>
        {fields.map((field, index) => (
          <div key={index} className={styles.fieldItem}>
            <span className={styles.fieldText}>{field}</span>
            <button
              className={styles.copyButton}
              onClick={() => handleCopy(field)}
              aria-label={`Copy ${field}`}
            >
              <Copy size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CopyText;
