import React, { useState } from 'react';
import styles from './CompanyTable.module.scss';

const CompanyTable = ({ 
  heading, 
  headers, 
  data, 
  canEdit = false, 
  onSave 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);

  const handleEdit = () => {
    if (isEditing) {
      onSave(editedData);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (key, value) => {
    setEditedData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.heading}>{heading}</span>
        {canEdit && (
          <button 
            className={styles.editButton}
            onClick={handleEdit}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        )}
      </div>
      <div className={styles.scrollable}>
        <div className={styles.content}>
          {headers.map(header => (
            <div key={header.key} className={styles.row}>
              <div className={styles.label}>{header.label}:</div>
              <div className={styles.value}>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData[header.key]}
                    onChange={(e) => handleInputChange(header.key, e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  editedData[header.key]
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyTable;
