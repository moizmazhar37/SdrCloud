import React, { useState } from "react";
import useLeads from "./useLeads";
import Table from "src/Common/Table/Table";
import SearchFilters from "../SearchFilters/SearchFilters";
import Pagination from "src/Common/Pagination/Pagination";
import { headers, transformData } from "./helpers";
import styles from "./SearchLeads.module.scss";

export default function SearchLeads() {
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const { leads, loading, error, totalCount } = useLeads(
    offset,
    ITEMS_PER_PAGE
  );
  console.log("Total Count==", totalCount);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // No need to fetch data here as useLeads will handle it via dependencies
  };

  const transformedData = transformData(leads);

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.filterSection}>
          <SearchFilters />
        </div>
        <div className={styles.tableSection}>
          <div className={styles.TableAndPagination}>
            <div className={styles.TableWrapper}>
              <Table
                headers={headers}
                data={transformedData}
                onRowSelect={setSelectedRows}
                selectedRows={selectedRows}
              />
            </div>
            <div className={styles.paginationWrapper}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
