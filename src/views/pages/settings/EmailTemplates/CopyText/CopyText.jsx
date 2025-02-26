import React from "react";
import { Copy } from "lucide-react";
import styles from "./CopyText.module.scss";
import InfoBox from "src/Common/InfoBox/InfoBox";

const CopyText = ({ fields = [], onInsert }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Copy to Add Dynamic Fields
        <InfoBox text="Click to insert dynamic fields into your email." />
      </div>

      <div className={styles.fieldList}>
        {fields.map((field, index) => (
          <button
            key={index}
            className={styles.fieldItem}
            onClick={() => onInsert(`[${field}]`)}
            aria-label={`Insert ${field}`}
          >
            <span className={styles.fieldText}>{field}</span>
            <Copy size={16} className={styles.copyIcon} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CopyText;
