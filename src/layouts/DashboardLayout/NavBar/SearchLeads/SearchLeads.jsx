import React, { useState, useEffect } from "react";
import useLeads from "./useLeads";
import Table from "src/Common/Table/Table";
import SearchFilters from "../SearchFilters/SearchFilters";
import Pagination from "src/Common/Pagination/Pagination";
import { headers, transformData } from "./helpers";
import styles from "./SearchLeads.module.scss";
import Loader from "src/Common/Loader/Loader";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";

export default function SearchLeads({
  initialFilters = null,
  isFromDashboard = false,
}) {
  const navigationItems = [
    { text: "Leads Dashboard", route: "/visitor-dashboard" },
    { text: "Data Details", route: "/leads-dashboard" },
  ];

  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentFilters, setCurrentFilters] = useState(null);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // If dashboard mode is on and initial filters exist, use them
  // Otherwise, use currentFilters
  const filtersToUse =
    isFromDashboard && initialFilters ? initialFilters : currentFilters;

  const { leads, loading, error, totalCount } = useLeads(
    offset,
    ITEMS_PER_PAGE,
    filtersToUse
  );

  // Automatically trigger search when in dashboard mode
  useEffect(() => {
    if (isFromDashboard && initialFilters) {
      setCurrentPage(1);
    }
  }, [initialFilters, isFromDashboard]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (filters) => {
    setCurrentPage(1);
    setCurrentFilters(filters);
  };

  const transformedData = transformData(leads);

  return (
    <div className={styles.container}>
      {isFromDashboard && <DynamicNavigator items={navigationItems} />}
      <div className={styles.contentWrapper}>
        {/* Only show SearchFilters if not from dashboard or no initial filters */}
        {(!isFromDashboard || !initialFilters) && (
          <div className={styles.filterSection}>
            <SearchFilters
              onSearch={handleSearch}
              initialFilters={isFromDashboard ? initialFilters : null}
            />
          </div>
        )}
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
