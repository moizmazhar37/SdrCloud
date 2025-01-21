import React, { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
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
  const [activeColorPicker, setActiveColorPicker] = useState(null);

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

  const isColorField = (key) => {
    return key === "primaryColor" || key === "secondaryColor";
  };

  const renderColorPicker = (header, value) => {
    return (
      <div className={styles.colorPickerContainer}>
        <div
          className={styles.colorPreview}
          style={{ backgroundColor: value || "#ffffff" }}
          onClick={() => setActiveColorPicker(header.key)}
        />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onInputChange(header.key, e.target.value)}
          className={styles.colorInput}
        />
        {activeColorPicker === header.key && (
          <div className={styles.colorPickerPopover}>
            <div
              className={styles.colorPickerCover}
              onClick={() => setActiveColorPicker(null)}
            />
            <HexColorPicker
              color={value || "#ffffff"}
              onChange={(color) => {
                onInputChange(header.key, color);
              }}
            />
          </div>
        )}
      </div>
    );
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
      if (isColorField(header.key)) {
        return (
          <div className={styles.colorDisplay}>
            <div
              className={styles.colorPreview}
              style={{ backgroundColor: value || "#ffffff" }}
            />
            <span>{value}</span>
          </div>
        );
      }
      return value;
    }

    if (!header.editable) {
      return value;
    }

    if (isColorField(header.key)) {
      return renderColorPicker(header, value);
    }

    return (
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onInputChange(header.key, e.target.value)}
        className={styles.input}
        style={{ color: "inherit" }}
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
