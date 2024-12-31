import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useUserCounts = () => {
  const [isStatsloading, setLoading] = useState(false);
  const [statsError, setError] = useState(null);
  const [statsData, setData] = useState({
    totalUsers: null,
    admins: null,
    endUsers: null,
  });

  const fetchUserCounts = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);

    try {
      const res = await axios({
        url: `${ApiConfig.mainDashboard}/user-stats`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch user counts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCounts();
  }, []);

  return { isStatsloading, statsError, statsData };
};

export default useUserCounts;
