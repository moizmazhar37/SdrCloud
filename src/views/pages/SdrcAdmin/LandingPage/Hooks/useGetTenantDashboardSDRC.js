import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "src/config/APIConfig";

const useGetTenantDashboardSDRC = (startDate, endDate) => {
  const storedTenantId = localStorage.getItem("tenant_id");
  const effectiveTenantId = storedTenantId;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        setError(null);

        // Build query parameters
        const queryParams = new URLSearchParams();

        if (startDate) {
          queryParams.append("start_date", startDate);
        }

        if (endDate) {
          queryParams.append("end_date", endDate);
        }

        // Construct the URL with query parameters
        const apiUrl = `${url}/sdrc-admin/tenant/${effectiveTenantId}${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`;

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (effectiveTenantId) {
      fetchData();
    }
  }, [effectiveTenantId, startDate, endDate]);

  return { data, loading, error };
};

export default useGetTenantDashboardSDRC;
