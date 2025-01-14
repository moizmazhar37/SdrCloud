import React from 'react';
import styles from './table.module.scss';

const Table = ({ 
  // Support both prop patterns
  headers,
  columns,
  data = [],
  clickableFields = [],
  onFieldClick,
  onColumnClick,
  columnStyles = {} // New prop for column-specific styles
}) => {
  // Normalize the column definitions
  const normalizedColumns = headers 
    ? headers.map(header => ({
        key: header.key,
        label: header.label,
        clickable: clickableFields.includes(header.key)
      }))
    : columns || [];

  const safeData = data || [];

  // Unified click handler
  const handleClick = (row, fieldKey) => {
    if (headers) {
      // First prop pattern
      if (clickableFields.includes(fieldKey) && onFieldClick) {
        onFieldClick(fieldKey, row);
      }
    } else {
      // Second prop pattern
      const column = normalizedColumns.find(col => col.key === fieldKey);
      if (column?.clickable && onColumnClick) {
        onColumnClick(row, fieldKey);
      }
    }
  };

  if (!safeData?.length) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                {normalizedColumns.map((column) => (
                  <th key={column.key} className={styles.tableHeader}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={normalizedColumns.length}
                  className={styles.noDataCell}
                >
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              {normalizedColumns.map((column) => (
                <th key={column.key} className={styles.tableHeader}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeData.map((row, rowIndex) => (
              <tr key={row.id || rowIndex} className={styles.tableRow}>
                {normalizedColumns.map((column) => {
                  const isClickable = column.clickable || clickableFields.includes(column.key);
                  const columnStyle = columnStyles[column.key] || {}; // Get style for the current column

                  return (
                    <td
                      key={column.key}
                      onClick={() => handleClick(row, column.key)}
                      className={`${styles.tableCell} ${isClickable ? styles.clickableCell : ''}`}
                      style={columnStyle} // Apply custom column style
                    >
                      {row[column.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
