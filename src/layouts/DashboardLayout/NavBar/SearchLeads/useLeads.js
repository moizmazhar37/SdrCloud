import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

export default function useLeads(offset = 0, limit = 8) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${ApiConfig.getUrls}/leads`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            offset: offset,
            limit: limit,
          },
        });

        if (response?.status === 200) {
          console.log("API+++", response.data);
          setLeads(response.data.data);
          console.log("LEADS===", leads);
          setTotalCount(response.data.totalRecords);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
        setError("Failed to load leads.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [offset, limit]);

  return { leads, loading, error, totalCount };
}
