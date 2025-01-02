import React from "react";
import styles from "./table.module.scss";

const Table = ({ headers, data, clickableFields = [], onFieldClick }) => {
  const handleClick = (fieldName, rowData) => {
    if (clickableFields.includes(fieldName) && onFieldClick) {
      onFieldClick(fieldName, rowData);
    }
  };

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className={styles.tableHeader}>
                  <span className={styles.headerContent}>{header.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={styles.tableRow}>
                {headers.map((header, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      ${styles.tableCell}
                      ${
                        clickableFields.includes(header.key)
                          ? styles.clickable
                          : ""
                      }
                    `}
                    onClick={() => handleClick(header.key, row)}
                  >
                    <span className={styles.cellContent}>
                      {row[header.key]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
