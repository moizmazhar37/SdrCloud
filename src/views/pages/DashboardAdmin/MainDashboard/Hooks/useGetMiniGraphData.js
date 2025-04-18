import { useState, useEffect } from "react";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";

const useGetMiniGraphData = (headline) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!headline) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get auth token from local storage
        const token = localStorage.getItem("token");

        // Make API request with token in headers
        const response = await axios.get(
          `${ApiConfig.mainDashboard}/sheets-connected-by-month`,
          {
            params: { headline },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data);
      } catch (err) {
        console.error("Error fetching mini graph data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [headline]);

  return { data, loading, error };
};

export default useGetMiniGraphData;
