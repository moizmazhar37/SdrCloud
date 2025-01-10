import React, { useEffect, useState } from 'react';
import styles from "./sheet-details.module.scss";
import CompanyTable from "../../../Company/CompanyTable/CompanyTable";

const SheetDetails = ({ viewData }) => {
  const [tableData, setTableData] = useState(null);

  const truncateUrl = (url) => {
    if (!url) return 'N/A';
    if (url.length <= 30) return url;
    return url.substring(0, 30) + '...';
  };

  useEffect(() => {
    if (viewData) {
      const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
          return new Date(dateString).toLocaleString();
        } catch (e) {
          return dateString;
        }
      };

      const formatUrl = (url) => {
        if (!url) return 'N/A';
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.urlLink}
            title={url} 
          >
            {truncateUrl(url)}
          </a>
        );
      };

      setTableData({
        title: viewData.title || 'N/A',
        field_count: viewData.field_count?.toString() || 'N/A',
        total_records: viewData.total_records?.toString() || 'N/A',
        fetch_url: formatUrl(viewData.fetch_url),
        created_at: formatDate(viewData.created_at),
      });
    }
  }, [viewData]);

  const headers = [
    { key: "title", label: "Title" },
    { key: "field_count", label: "Field Count" },
    { key: "total_records", label: "Total Records" },
    { key: "fetch_url", label: "Fetch URL" },
    { key: "created_at", label: "Creation Date" },
  ];

  if (!tableData) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}> </div>
      </div>
    );
  }

  return (
    <div>
      <CompanyTable
        heading="Sheet Details"
        headers={headers}
        data={tableData}
        canEdit={false}
        onSave={() => {}}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Sheet Type</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.dropwdrownrow}>
            <td className={styles.column}>
              <p className={styles.title}>Select Sheet Type</p>
              <select className={styles.dropdown} disabled>
                <option value={viewData?.sheet_type || ''}>
                  {viewData?.sheet_type || 'N/A'}
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SheetDetails;