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
      // Create a filtered payload with only non-empty data
      const payload = {};

      // Process each alert type (emails, budget, hvo, video)
      Object.keys(alertsData).forEach((key) => {
        const alertData = alertsData[key];

        // Only include this alert type if it's active
        if (alertData && alertData.active) {
          // Create a clean object for this alert type
          const cleanAlertData = {
            active: alertData.active,
            type: alertData.type,
          };

          // Only include emailCount if it has a value
          if (alertData.emailCount && alertData.emailCount.trim() !== "") {
            cleanAlertData.emailCount = alertData.emailCount;
          }

          // Only include receiveAlerts if it's true (to reduce payload size)
          if (alertData.receiveAlerts) {
            cleanAlertData.receiveAlerts = alertData.receiveAlerts;
          } else {
            // Always include receiveAlerts if active is true, as backend might need this value
            cleanAlertData.receiveAlerts = false;
          }

          // Add this clean alert data to the payload
          payload[key] = cleanAlertData;
        }
      });

      // If no active alerts, include empty structure to match API expectations
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
        // Ensure all required keys exist in payload to match API expectations
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
