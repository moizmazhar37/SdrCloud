import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

export default function useLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${ApiConfig.getUrls}/leads`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response?.status === 200) {
          setLeads(response.data);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
        setError("Failed to load leads.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return { leads, loading, error };
}
