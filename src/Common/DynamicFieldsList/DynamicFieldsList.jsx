import React from 'react';
import styles from './DynamicFieldsList.module.scss';
import useDynamicFieldList from './useDynamicFIeldList';

const DynamicFieldsList = ({ templateId, title = "Template Strings" }) => {
  const { stringList, loading, error } = useDynamicFieldList(templateId);

  const displayList = stringList.length > 0 ? stringList : [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {error && (
          <span className={styles.errorIndicator} title={error}>
            ⚠️
          </span>
        )}
      </div>
      
      <div className={styles.tagsContainer}>
        {loading ? (
          <div className={styles.loading}>Loading template strings...</div>
        ) : error ? (
          <div className={styles.errorMessage}>
            <span className={styles.errorText}>Failed to load strings</span>
            <div className={styles.fallbackNote}>Showing sample data</div>
            <div className={styles.tags}>
              {displayList.map((item, index) => (
                <span key={index} className={`${styles.tag} ${styles.fallbackTag}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.tags}>
            {displayList.map((item, index) => (
              <span key={index} className={styles.tag}>
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicFieldsList;