import { useState, useEffect } from "react";
import axios from "axios";
import { domain as baseUrl } from "src/config/APIConfig";

const useGetStatus = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseUrl}/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (err) {
        console.error("Error fetching status:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return { data, loading, error };
};

export default useGetStatus;
