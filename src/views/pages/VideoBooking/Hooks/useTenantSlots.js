import { useCallback, useEffect, useState } from "react";
import { tenantMeeting } from "src/config/APIConfig";

const useTenantSlots = (tenant_id) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTenantSlots = useCallback(async () => {
    if (!tenant_id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${tenantMeeting}/tenant-slots/${tenant_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || "Failed to fetch tenant slots");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tenant_id]);

  useEffect(() => {
    fetchTenantSlots();
  }, [fetchTenantSlots]);

  return { data, error, loading, refetch: fetchTenantSlots };
};

export default useTenantSlots;
