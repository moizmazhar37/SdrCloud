import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { campaignSettings } from "src/config/APIConfig";

const useSaveGeneralSettings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id: agentIdFromUrl } = useParams();

  const saveGeneralSettings = async (templateId, settings) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const url = `${campaignSettings}/channel-limits`;

      const requestBody = {
        template_id: templateId,
        agent_id: agentIdFromUrl,
        sms_enabled: settings.smsEnabled,
        email_enabled: settings.emailEnabled,
        from_email: settings.fromEmail,
        from_name: settings.fromName,
        reply_to: settings.replyToEmail,
        max_sms_per_day: parseInt(settings.maxSmsPerDay) || 0,
        max_emails_per_day: parseInt(settings.maxEmailPerDay) || 0,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const backendMessage =
          responseData.message || "An unexpected error occurred.";
        throw new Error(backendMessage);
      }

      toast.success("General settings saved successfully!");
      return responseData;
    } catch (err) {
      const fallbackMessage =
        err.message || "An error occurred while saving settings.";
      toast.error(fallbackMessage);
      setError(fallbackMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveGeneralSettings,
    loading,
    error,
    agentId: agentIdFromUrl,
  };
};

export default useSaveGeneralSettings;
