import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useFetchAccounts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios({
            method: "GET",
            url: ApiConfig.getAllTenants,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch accounts");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return { data, loading, error };
};

export default useFetchAccounts;
