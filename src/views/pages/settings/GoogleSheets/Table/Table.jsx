import React from "react";
import PropTypes from "prop-types";
import styles from "./table.module.scss";

const Table = ({ data = [], columns = [], onColumnClick }) => {

  const safeData = data || [];
  const safeColumns = columns || [];

  if (!data?.length) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {safeColumns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td 
                  colSpan={safeColumns.length} 
                  style={{ textAlign: 'center' }}
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
    <>
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {safeColumns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeData.map((row) => (
              <tr key={row.id || Math.random()}>
                {safeColumns.map((column) => (
                  <td
                    key={column.key}
                    onClick={() =>
                      column.clickable && onColumnClick
                        ? onColumnClick(row, column.key)
                        : null
                    }
                    className={column.clickable ? styles.clickable : ""}
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
    </>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      clickable: PropTypes.bool,
    })
  ),
  onColumnClick: PropTypes.func,
};

Table.defaultProps = {
  data: [],
  columns: [],
  onColumnClick: () => {},
};

export default Table;