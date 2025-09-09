import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { campaignSettings } from "src/config/APIConfig";

const useSaveDeliverySettings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id: agentIdFromUrl } = useParams();

  const saveDeliverySettings = async (templateId, settings) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const url = `${campaignSettings}/time-settings`;
      const convertTimeToISO = (timeString) => {
        if (!timeString) return "00:00:57.006Z";
        return `${timeString}:57.006Z`;
      };
      const finalAgentId = agentIdFromUrl;

      const requestBody = {
        template_id: templateId,
        agent_id: finalAgentId,
        weekdays_time: convertTimeToISO(settings.weekdaysTime),
        weekend_time: convertTimeToISO(settings.weekendTime),
        max_reminders: parseInt(settings.maxReminders) || 0,
      };

      if (settings.start_date) {
        requestBody.start_date = settings.start_date;
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      toast.success("Delivery settings saved successfully!");
      return data;
    } catch (err) {
      setError(err.message);
      toast.error(`Failed to save delivery settings: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveDeliverySettings,
    loading,
    error,
  };
};

export default useSaveDeliverySettings;
