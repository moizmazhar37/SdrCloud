import { useEffect, useState } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useGetAdminDashboard = (start_date, end_date) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found in local storage");
        }

        const now = new Date();
        const defaultStartDate = new Date(
          Date.UTC(now.getUTCFullYear(), 0, 1)
        ).toISOString();
        const defaultEndDate = new Date().toISOString();

        const params = {
          start_date: start_date || defaultStartDate,
          end_date: end_date || defaultEndDate,
        };

        console.log("Fetching dashboard data with params:", params);

        const response = await axios({
          url: `${ApiConfig.mainDashboard}/new-dashboard`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        });

        setData(response.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [start_date, end_date]);

  return { data, loading, error };
};

export default useGetAdminDashboard;
