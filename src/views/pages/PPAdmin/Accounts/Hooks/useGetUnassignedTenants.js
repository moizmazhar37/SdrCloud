import { useEffect, useState } from "react";
import axios from "axios";
import { tenant } from "src/config/APIConfig";

const useGetUnassignedTenants = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${tenant}/unassigned-sdrc-admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Normalize if needed (assuming same structure as assigned)
        const normalized = response.data.map((tenant) => ({
          id: tenant.id,
          name: tenant.compnay_name, // adjust if typo, e.g. company_name
        }));

        setData(normalized);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useGetUnassignedTenants;
