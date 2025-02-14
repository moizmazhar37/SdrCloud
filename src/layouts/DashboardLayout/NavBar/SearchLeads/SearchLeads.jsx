// SearchLeads.jsx
import React, { useState } from "react";
import useLeads from "./useLeads";
import Table from "src/Common/Table/Table";
import SearchFilters from "../SearchFilters/SearchFilters";
import Pagination from "src/Common/Pagination/Pagination";
import { headers, transformData } from "./helpers";
import styles from "./SearchLeads.module.scss";
import Loader from "src/Common/Loader/Loader";

export default function SearchLeads() {
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentFilters, setCurrentFilters] = useState(null);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { leads, loading, error, totalCount } = useLeads(
    offset,
    ITEMS_PER_PAGE,
    currentFilters
  );

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (filters) => {
    setCurrentPage(1);
    setCurrentFilters(filters);
    // Removed refetch() call since useEffect will handle it
  };

  const transformedData = transformData(leads);

  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.filterSection}>
          <SearchFilters onSearch={handleSearch} />
        </div>
        <div className={styles.tableSection}>
          <div className={styles.TableAndPagination}>
            {loading ? (
              <div className={styles.loader}>
                <Loader />
              </div>
            ) : (
              <div className={styles.TableWrapper}>
                <Table
                  headers={headers}
                  data={transformedData}
                  onRowSelect={setSelectedRows}
                  selectedRows={selectedRows}
                />
              </div>
            )}

            {!loading && (
              <div className={styles.paginationWrapper}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
