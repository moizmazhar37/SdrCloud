// SearchLeads.jsx
import React, { useState } from "react";
import useLeads from "./useLeads";
import Table from "src/Common/Table/Table";
import SearchFilters from "../SearchFilters/SearchFilters";
import Pagination from "src/Common/Pagination/Pagination";
import styles from "./SearchLeads.module.scss";

export default function SearchLeads() {
  const { leads, loading, error } = useLeads();
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Add your logic here (e.g., fetching data for the new page)
  };

  const headers = [
    { label: "Full Name", key: "full_name" },
    { label: "Email", key: "email" },
    { label: "Address", key: "address" },
    { label: "Location", key: "location" },
    { label: "Demographics", key: "demographics" },
    { label: "Financial", key: "financial" },
    { label: "Actions", key: "actions" },
  ];

  const transformedData = leads.map((lead) => ({
    full_name: `${lead.first_name} ${lead.last_name}`,
    email: lead.personal_email,
    address: `${lead.contact_address}${
      lead.contact_address_2 ? `, ${lead.contact_address_2}` : ""
    }`,
    location: `${lead.contact_metro_city}, ${lead.contact_state} ${
      lead.contact_zip
    }${lead.contact_zip4 ? `-${lead.contact_zip4}` : ""}`,
    demographics: `${lead.gender} | Age: ${lead.age_range}`,
    financial: `Income: ${lead.income_range} | Net Worth: ${lead.net_worth}`,
    actions: "View Details",
  }));

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.filterSection}>
          <SearchFilters />
        </div>
        <div className={styles.tableSection}>
          <Table
            headers={headers}
            data={transformedData}
            onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
            selectedRows={selectedRows}
          />
        </div>
      </div>
      <div className={styles.paginationWrapper}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
