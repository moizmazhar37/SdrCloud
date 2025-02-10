import React from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, totalPages, onPageChange, className }) => {
  const generatePageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`${styles.pagination} ${className || ""}`}>
      <button
        className={`${styles.arrow} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {generatePageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${styles.pageNumber} ${
            currentPage === pageNumber ? styles.active : ""
          }`}
          onClick={() => onPageChange(pageNumber)}
          aria-label={`Page ${pageNumber}`}
          aria-current={currentPage === pageNumber ? "page" : undefined}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className={`${styles.arrow} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
