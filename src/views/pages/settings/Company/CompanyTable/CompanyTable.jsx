import React, { useRef } from "react";
import styles from "./CompanyTable.module.scss";

const CompanyTable = ({
  heading,
  headers,
  data,
  isEditing,
  onInputChange,
  onFileUpload,
}) => {
  const fileInputRef = useRef(null);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const renderField = (header, value) => {
    if (header.type === "file") {
      return (
        <div className={styles.logoContainer}>
          {value && (
            <img src={value} alt="Logo" className={styles.circularLogo} />
          )}
          {isEditing && (
            <div className={styles.fileUpload}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*"
              />
              <button
                className={styles.uploadButton}
                onClick={() => fileInputRef.current.click()}
              >
                {value ? "Change Logo" : "Upload Logo"}
              </button>
            </div>
          )}
        </div>
      );
    }

    if (header.type === "pdf") {
      return (
        <button
          onClick={() => window.open(value, "_blank")}
          className={styles.pdfButton}
        >
          hubspotcontract.pdf
        </button>
      );
    }

    if (!isEditing) {
      if (typeof value === "string" && isValidUrl(value)) {
        return (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.urlLink}
          >
            {value}
          </a>
        );
      }
      return value;
    }

    if (!header.editable) {
      return value;
    }

    return (
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onInputChange(header.key, e.target.value)}
        className={styles.input}
        style={{ color: "inherit" }} // Keep the color consistent
      />
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.heading}>{heading}</span>
      </div>
      <div className={styles.scrollable}>
        <div className={styles.content}>
          {headers.map((header) => (
            <div key={header.key} className={styles.row}>
              {header.type !== "pdf" && (
                <div className={styles.label}>{header.label}:</div>
              )}
              <div className={styles.value}>
                {renderField(header, data?.[header.key])}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyTable;
