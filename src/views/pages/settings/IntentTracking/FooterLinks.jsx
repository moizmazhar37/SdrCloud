import React, { useState, useEffect } from "react";
import styles from "./footer-links.module.scss";

const FooterLinks = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.heading}>Footer Link</span>
                <button className={styles.editButton} onClick={handleEdit}>
                    {isEditing ? "Save" : "Edit"}
                </button>
            </div>
            <div className={styles.scrollable}>
                <div className={styles.content}>
                    {/* {headers.map((header) => (
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
          ))} */}
                </div>
            </div>
        </div>
    );
};

export default FooterLinks;
