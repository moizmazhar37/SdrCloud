import { useState } from "react";
import axios from "axios";
import { admin } from "src/config/APIConfig";

const useUnassignTenantsFromSdrcAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const unassignTenants = async ({ tenant_ids, sdrc_admin_id }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${admin}/unassign-sdrc-admin`,
        {
          tenant_ids,
          sdrc_admin_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    unassignTenants,
    loading,
    error,
    success,
  };
};

export default useUnassignTenantsFromSdrcAdmin;
