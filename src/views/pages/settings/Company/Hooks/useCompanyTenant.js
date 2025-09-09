import { useState, useEffect } from "react";
import axios from "axios";
import { tenant } from "src/config/APIConfig";

const useCompanyTenant = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyTenant = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(`${tenant}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching company tenant:", err);
        setError(err.response?.data?.message || "Failed to fetch company data");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyTenant();
  }, []);

  return { data, loading, error };
};

export default useCompanyTenant;
