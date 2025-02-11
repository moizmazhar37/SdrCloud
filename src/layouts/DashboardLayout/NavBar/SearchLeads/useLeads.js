// useLeads.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

export default function useLeads(offset = 0, limit = 8, filters = null) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${ApiConfig.getUrls}/leads`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        params: {
          offset,
          limit,
          filters: filters ? JSON.stringify(filters) : null,
        },
      });

      if (response?.status === 200) {
        setLeads(response.data.data);
        setTotalCount(response.data.totalRecords);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      setError("Failed to load leads.");
    } finally {
      setLoading(false);
    }
  }, [offset, limit, filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return { leads, loading, error, totalCount, refetch: fetchLeads };
}
