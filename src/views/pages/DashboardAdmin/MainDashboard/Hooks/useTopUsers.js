import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useTopUsers = (timeframe = "month") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topUsersData, setData] = useState([]);

  const fetchTopUsers = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);

    try {
      const res = await axios({
        url: `${ApiConfig.mainDashboard}/top-users`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { timeframe },
      });

      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch top users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopUsers();
  }, [timeframe]);

  return { loading, error, topUsersData };
};

export default useTopUsers;
