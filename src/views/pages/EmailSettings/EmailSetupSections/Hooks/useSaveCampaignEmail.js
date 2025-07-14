import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { campaignEmail } from "src/config/APIConfig";

const useSaveCampaignEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { id: agentIdFromUrl } = useParams();

  const saveCampaignEmail = async ({
    subject,
    message,
    isHtml,
    templateId,
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        campaignEmail,
        {
          subject,
          body: message,
          is_html: isHtml,
          template_id: templateId,
          agent_id: agentIdFromUrl,
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
      console.error("Failed to save campaign email:", err);

      const backendMessage =
        err?.response?.data?.detail || "Failed to save campaign email.";

      setError(backendMessage);
      throw new Error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    saveCampaignEmail,
    loading,
    error,
    success,
    agentId: agentIdFromUrl,
  };
};

export default useSaveCampaignEmail;
