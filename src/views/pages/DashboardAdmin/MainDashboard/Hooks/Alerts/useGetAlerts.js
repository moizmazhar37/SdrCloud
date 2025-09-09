import { useState, useEffect } from "react";
import axios from "axios";
import { alerts } from "src/config/APIConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useGetRealTimeAlerts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAlerts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${alerts}/get-user-alerts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred while fetching alerts";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAlerts();
  }, []);

  return {
    data,
    loading,
    error,
    refresh: getAlerts,
  };
};

export default useGetRealTimeAlerts;
