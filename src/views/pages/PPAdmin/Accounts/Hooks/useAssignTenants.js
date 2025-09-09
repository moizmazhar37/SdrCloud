import { useState } from "react";
import axios from "axios";
import { admin } from "src/config/APIConfig";

const useAssignTenantsToSdrcAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const assignTenants = async ({ tenant_ids, sdrc_admin_id }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${admin}/assign-sdrc-admin`,
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
    assignTenants,
    loading,
    error,
    success,
  };
};

export default useAssignTenantsToSdrcAdmin;
