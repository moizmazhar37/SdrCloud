import React, { useState, useEffect } from "react";
import styles from "./Table.module.scss";

const Table = ({ heading, headers, data, canEdit = false, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const handleEdit = () => {
    if (isEditing) {
      onSave(editedData);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (key, value) => {
    setEditedData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const renderValue = (value) => {
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
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.heading}>{heading}</span>
        {canEdit && (
          <button className={styles.editButton} onClick={handleEdit}>
            {isEditing ? "Save" : "Edit"}
          </button>
        )}
      </div>
      <div className={styles.scrollable}>
        <div className={styles.content}>
          {headers.map((header) => (
            <div key={header.key} className={styles.row}>
              <div className={styles.label}>{header.label}:</div>
              <div className={styles.value}>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData[header.key]}
                    onChange={(e) =>
                      handleInputChange(header.key, e.target.value)
                    }
                    className={styles.input}
                  />
                ) : (
                  renderValue(editedData[header.key])
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
