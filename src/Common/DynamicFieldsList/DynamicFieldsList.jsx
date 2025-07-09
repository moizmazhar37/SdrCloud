import React, { useState, useEffect } from 'react';
import styles from './DynamicFieldsList.module.scss';

const DynamicFieldsList = ({ templateId, title = "Template Strings" }) => {
  const [stringList, setStringList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (templateId) {
      fetchStringList();
    }
  }, [templateId]);

  const fetchStringList = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/templates/${templateId}/strings`);
      const data = await response.json();
      setStringList(Array.isArray(data) ? data : data.strings || []);
    } catch (err) {
      console.error('Error fetching string list:', err);
    } finally {
      setLoading(false);
    }
  };

  // Static fallback data for testing
  const staticList = [
    "name",
    "email", 
    "phone",
    "company",
    "address",
    "city",
    "country"
  ];

  const displayList = stringList.length > 0 ? stringList : staticList;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      
      <div className={styles.tagsContainer}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          displayList.map((item, index) => (
            <span key={index} className={styles.tag}>
              {item}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default DynamicFieldsList;