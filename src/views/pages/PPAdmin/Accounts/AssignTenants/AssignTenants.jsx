import React, { useState, useEffect } from "react";
import styles from "./AssignTenants.module.scss";
import useGetAssignedTenants from "../Hooks/useGetAssignedTenants";
import useGetUnassignedTenants from "../Hooks/useGetUnassignedTenants";
import useAssignTenantsToSdrcAdmin from "../Hooks/useAssignTenants";
import useUnassignTenantsFromSdrcAdmin from "../Hooks/useUnassignTenants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignTenants = ({ isFromUserList = false, userData = null }) => {
  const sdrc_admin_id = userData?.id;
  const {
    data: fetchedAssignedTenants,
    loading: fetchAssignedLoading,
    error: fetchAssignedError,
  } = useGetAssignedTenants(sdrc_admin_id);

  const {
    data: fetchedUnassignedTenants,
    loading: fetchUnassignedLoading,
    error: fetchUnassignedError,
  } = useGetUnassignedTenants();

  const {
    assignTenants,
    loading: assignLoading,
    error: assignError,
    success: assignSuccess,
  } = useAssignTenantsToSdrcAdmin();

  const {
    unassignTenants,
    loading: unassignLoading,
    error: unassignError,
    success: unassignSuccess,
  } = useUnassignTenantsFromSdrcAdmin();

  const [assignedTenants, setAssignedTenants] = useState([]);
  const [availableTenants, setAvailableTenants] = useState([]);

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

  // Update available tenants when fetched
  useEffect(() => {
    if (fetchedUnassignedTenants && Array.isArray(fetchedUnassignedTenants)) {
      setAvailableTenants(fetchedUnassignedTenants);
    }
  }, [fetchedUnassignedTenants]);

  // Display success or error message when assign API call completes
  useEffect(() => {
    if (assignSuccess) {
      toast.success("Tenants assigned successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    if (assignError) {
      toast.error(
        `Error: ${assignError.message || "Failed to assign tenants"}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  }, [assignSuccess, assignError]);

  // Display success or error message when unassign API call completes
  useEffect(() => {
    if (unassignSuccess) {
      toast.success("Tenants unassigned successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    if (unassignError) {
      toast.error(
        `Error: ${unassignError.message || "Failed to unassign tenants"}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  }, [unassignSuccess, unassignError]);

  // Display error message for fetch errors
  useEffect(() => {
    if (fetchAssignedError) {
      toast.error(
        `Error: ${
          fetchAssignedError.message || "Failed to fetch assigned tenants"
        }`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }

    if (fetchUnassignedError) {
      toast.error(
        `Error: ${
          fetchUnassignedError.message || "Failed to fetch available tenants"
        }`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  }, [fetchAssignedError, fetchUnassignedError]);

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

  const handleUnassign = async () => {
    if (selectedAssignedTenants.length === 0 || !sdrc_admin_id) return;

    try {
      // Call the API with selected tenant IDs and admin ID
      const result = await unassignTenants({
        tenant_ids: selectedAssignedTenants,
        sdrc_admin_id: sdrc_admin_id,
      });

      if (result) {
        // Move tenants to available list in the UI
        const tenantsToMove = assignedTenants.filter((tenant) =>
          selectedAssignedTenants.includes(tenant.id)
        );

        setAvailableTenants((prev) => [...prev, ...tenantsToMove]);
        setAssignedTenants((prev) =>
          prev.filter((tenant) => !selectedAssignedTenants.includes(tenant.id))
        );
        setSelectedAssignedTenants([]);
      }
    } catch (err) {
      console.error("Error unassigning tenants:", err);
      toast.error(`Error: ${err.message || "Failed to unassign tenants"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleAssign = async () => {
    if (selectedAvailableTenants.length === 0 || !sdrc_admin_id) return;

    try {
      // Call the API with selected tenant IDs and admin ID
      const result = await assignTenants({
        tenant_ids: selectedAvailableTenants,
        sdrc_admin_id: sdrc_admin_id,
      });

      if (result) {
        // Move tenants to assigned list in the UI
        const tenantsToMove = availableTenants.filter((tenant) =>
          selectedAvailableTenants.includes(tenant.id)
        );

        setAssignedTenants((prev) => [...prev, ...tenantsToMove]);
        setAvailableTenants((prev) =>
          prev.filter((tenant) => !selectedAvailableTenants.includes(tenant.id))
        );
        setSelectedAvailableTenants([]);
      }
    } catch (err) {
      console.error("Error assigning tenants:", err);
      toast.error(`Error: ${err.message || "Failed to assign tenants"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const isLoading = fetchAssignedLoading || fetchUnassignedLoading;

  return (
    <div className={styles.container}>
      <ToastContainer />
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
                selectedAssignedTenants.length === 0 || unassignLoading
                  ? styles.disabled
                  : ""
              }`}
              onClick={handleUnassign}
              disabled={selectedAssignedTenants.length === 0 || unassignLoading}
            >
              {unassignLoading ? "Unassigning..." : "Unassign Selected"}
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
              selectedAvailableTenants.length === 0 || assignLoading
                ? styles.disabled
                : ""
            }`}
            onClick={handleAssign}
            disabled={selectedAvailableTenants.length === 0 || assignLoading}
          >
            {assignLoading ? "Assigning..." : "Assign Selected"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTenants;
