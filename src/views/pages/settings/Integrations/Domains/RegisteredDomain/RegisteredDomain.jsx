import React from "react";
import styles from "./RegisteredDomain.module.scss";
import useDeleteDomain from "../Hooks/useDeleteDomain";

const RegisteredDomain = ({ domain, onDelete }) => {
  const { deleteDomain, loading: isDeleting } = useDeleteDomain();

  const handleDelete = async () => {
    const result = await deleteDomain();

    if (result) {
      // Successfully deleted, call the parent's onDelete function
      onDelete();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.checkIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className={styles.text}>
            This Tenant is authenticated with domain <strong>{domain}</strong>
          </span>
        </div>
        <button
          className={styles.deleteBtn}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default RegisteredDomain;
