import React, { useState, useEffect } from "react";
import styles from "./AssignTenants.module.scss";
import useGetAssignedTenants from "../Hooks/useGetAssignedTenants";

const AssignTenants = ({ isFromUserList = false, userData = null }) => {
  const sdrc_admin_id = userData?.id;
  const {
    data: fetchedAssignedTenants,
    loading,
    error,
  } = useGetAssignedTenants(sdrc_admin_id);

  const [assignedTenants, setAssignedTenants] = useState([]);
  const [availableTenants, setAvailableTenants] = useState([
    { id: 5, name: "Michael Brown" },
    { id: 6, name: "Sarah Wilson" },
    { id: 7, name: "David Miller" },
  ]);

  const [selectedAssignedTenants, setSelectedAssignedTenants] = useState([]);
  const [selectedAvailableTenants, setSelectedAvailableTenants] = useState([]);

  useEffect(() => {
    // Reset selections on mount
    setSelectedAssignedTenants([]);
    setSelectedAvailableTenants([]);
  }, []);

  // Update assigned tenants when fetched
  useEffect(() => {
    if (fetchedAssignedTenants && Array.isArray(fetchedAssignedTenants)) {
      setAssignedTenants(fetchedAssignedTenants);
    }
  }, [fetchedAssignedTenants]);

  const toggleAssignedTenant = (tenantId) => {
    setSelectedAssignedTenants((prev) =>
      prev.includes(tenantId)
        ? prev.filter((id) => id !== tenantId)
        : [...prev, tenantId]
    );
  };

  const toggleAvailableTenant = (tenantId) => {
    setSelectedAvailableTenants((prev) =>
      prev.includes(tenantId)
        ? prev.filter((id) => id !== tenantId)
        : [...prev, tenantId]
    );
  };

  const handleUnassign = () => {
    if (selectedAssignedTenants.length === 0) return;

    const tenantsToMove = assignedTenants.filter((tenant) =>
      selectedAssignedTenants.includes(tenant.id)
    );

    setAvailableTenants((prev) => [...prev, ...tenantsToMove]);
    setAssignedTenants((prev) =>
      prev.filter((tenant) => !selectedAssignedTenants.includes(tenant.id))
    );
    setSelectedAssignedTenants([]);
  };

  const handleAssign = () => {
    if (selectedAvailableTenants.length === 0) return;

    const tenantsToMove = availableTenants.filter((tenant) =>
      selectedAvailableTenants.includes(tenant.id)
    );

    setAssignedTenants((prev) => [...prev, ...tenantsToMove]);
    setAvailableTenants((prev) =>
      prev.filter((tenant) => !selectedAvailableTenants.includes(tenant.id))
    );
    setSelectedAvailableTenants([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Assign Tenants</h1>
      </div>

      {userData && (
        <div className={styles.userInfoCard}>
          <h2>User Details</h2>
          <div className={styles.userDetails}>
            <div className={styles.userDetail}>
              <span className={styles.label}>ID:</span>
              <span>{userData.id}</span>
            </div>
            <div className={styles.userDetail}>
              <span className={styles.label}>Name:</span>
              <span>{userData.name}</span>
            </div>
            <div className={styles.userDetail}>
              <span className={styles.label}>Email:</span>
              <span>{userData.email}</span>
            </div>
            <div className={styles.userDetail}>
              <span className={styles.label}>Phone:</span>
              <span>{userData.phone_no}</span>
            </div>
            <div className={styles.userDetail}>
              <span className={styles.label}>Created At:</span>
              <span>{userData.created_at}</span>
            </div>
            <div className={styles.userDetail}>
              <span className={styles.label}>Status:</span>
              <span>{userData.status}</span>
            </div>
          </div>
        </div>
      )}

      <div className={styles.tenantsContainer}>
        <div className={styles.tenantSection}>
          <h2>Assigned Tenants</h2>
          <>
            <div className={styles.tenantsList}>
              {assignedTenants.length > 0 ? (
                assignedTenants.map((tenant) => (
                  <button
                    key={tenant.id}
                    className={`${styles.tenantButton} ${
                      selectedAssignedTenants.includes(tenant.id)
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => toggleAssignedTenant(tenant.id)}
                  >
                    {tenant.name}
                  </button>
                ))
              ) : (
                <div className={styles.emptyState}>No assigned tenants</div>
              )}
            </div>
            <button
              className={`${styles.actionButton} ${
                selectedAssignedTenants.length === 0 ? styles.disabled : ""
              }`}
              onClick={handleUnassign}
              disabled={selectedAssignedTenants.length === 0}
            >
              Unassign Selected
            </button>
          </>
        </div>

        <div className={styles.tenantSection}>
          <h2>Available Tenants</h2>
          <div className={styles.tenantsList}>
            {availableTenants.length > 0 ? (
              availableTenants.map((tenant) => (
                <button
                  key={tenant.id}
                  className={`${styles.tenantButton} ${
                    selectedAvailableTenants.includes(tenant.id)
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => toggleAvailableTenant(tenant.id)}
                >
                  {tenant.name}
                </button>
              ))
            ) : (
              <div className={styles.emptyState}>No available tenants</div>
            )}
          </div>
          <button
            className={`${styles.actionButton} ${
              selectedAvailableTenants.length === 0 ? styles.disabled : ""
            }`}
            onClick={handleAssign}
            disabled={selectedAvailableTenants.length === 0}
          >
            Assign Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTenants;
