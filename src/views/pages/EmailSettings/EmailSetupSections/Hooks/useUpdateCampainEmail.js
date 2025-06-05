import { useState } from "react";
import axios from "axios";
import { updateCampaignEmail as buildUpdateUrl } from "src/config/APIConfig";

const useUpdateCampaignEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateCampaignEmail = async ({ subject, message, isHtml, templateId }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const url = buildUpdateUrl(templateId);
      const response = await axios.patch(
        url,
        {
          subject,
          body: message,
          is_html: isHtml
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      return response.data;
    } catch (err) {
      console.error("Failed to update campaign email:", err);

      const backendMessage =
        err?.response?.data?.detail || "Failed to update campaign email.";

      setError(backendMessage);
      throw new Error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateCampaignEmail, loading, error, success };
};

export default useUpdateCampaignEmail;
