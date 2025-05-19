import { useEffect, useState } from "react";
import axios from "axios";
import { admin } from "src/config/APIConfig";

const useGetAssignedTenants = (sdrc_admin_id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sdrc_admin_id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${admin}/sdrc-admin/${sdrc_admin_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Normalize response to match expected format
        const normalized = response.data.map((tenant) => ({
          id: tenant.id,
          name: tenant.compnay_name, // typo in key assumed to be intentional
        }));

        setData(normalized);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sdrc_admin_id]);

  return { data, loading, error };
};

export default useGetAssignedTenants;
