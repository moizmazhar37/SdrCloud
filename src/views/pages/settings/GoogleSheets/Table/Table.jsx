import React from 'react';
import styles from './table.module.scss';

const Table = ({ data = [], columns = [], onColumnClick }) => {
  const safeData = data || [];
  const safeColumns = columns || [];

  if (!safeData?.length) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                {safeColumns.map((column) => (
                  <th key={column.key} className={styles.tableHeader}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td 
                  colSpan={safeColumns.length} 
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
              {safeColumns.map((column) => (
                <th key={column.key} className={styles.tableHeader}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeData.map((row) => (
              <tr key={row.id || Math.random()} className={styles.tableRow}>
                {safeColumns.map((column) => (
                  <td
                    key={column.key}
                    onClick={() =>
                      column.clickable && onColumnClick
                        ? onColumnClick(row, column.key)
                        : null
                    }
                    className={`${styles.tableCell} ${
                      column.clickable ? styles.clickableCell : ''
                    }`}
                  >
                    {row[column.key]}
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