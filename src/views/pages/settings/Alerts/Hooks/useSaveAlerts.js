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
      const payload = {};
      Object.keys(alertsData).forEach((key) => {
        const alertData = alertsData[key];

        if (alertData && alertData.active) {
          const cleanAlertData = {
            active: alertData.active,
            type: alertData.type,
          };
          if (alertData.emailCount && alertData.emailCount.trim() !== "") {
            cleanAlertData.emailCount = alertData.emailCount;
          }
          if (alertData.receiveAlerts) {
            cleanAlertData.receiveAlerts = alertData.receiveAlerts;
          } else {
            cleanAlertData.receiveAlerts = false;
          }
          payload[key] = cleanAlertData;
        }
      });
      if (Object.keys(payload).length === 0) {
        payload.emails = { active: false, type: "email", receiveAlerts: false };
        payload.budget = {
          active: false,
          type: "budget",
          receiveAlerts: false,
        };
        payload.hvo = { active: false, type: "hvo", receiveAlerts: false };
        payload.video = { active: false, type: "video", receiveAlerts: false };
      } else {
        ["emails", "budget", "hvo", "video"].forEach((key) => {
          if (!payload[key]) {
            payload[key] = {
              active: false,
              type: key === "emails" ? "email" : key,
              receiveAlerts: false,
            };
          }
        });
      }

      const response = await axios.post(`${alerts}/save-alerts`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccess(true);
      toast.success("Alerts saved successfully.");
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
