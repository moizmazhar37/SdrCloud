import { useState } from "react";
import axios from "axios";
import { alerts } from "src/config/APIConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useSaveAlerts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const saveAlerts = async (alertsData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Filter to only include the data that exists in the component state
      const payload = {
        emails: alertsData.emails,
        budget: alertsData.budget,
        hvo: alertsData.hvo,
        video: alertsData.video,
      };

      const response = await axios.post(`${alerts}/save-alerts`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccess(true);
      toast.success("Alerts saved successfully!");
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred while saving alerts";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveAlerts,
    loading,
    error,
    success,
  };
};

export default useSaveAlerts;
