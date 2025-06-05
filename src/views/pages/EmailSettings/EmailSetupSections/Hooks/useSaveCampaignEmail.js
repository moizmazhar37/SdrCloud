import { useState } from "react";
import axios from "axios";
import { campaignEmail } from "src/config/APIConfig";

const TEMPLATE_ID = "b8e2a652-350b-42d5-b09e-9a0e4d345ccf";

const useSaveCampaignEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const saveCampaignEmail = async ({ subject, message, isHtml, }) => {
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
          template_id: TEMPLATE_ID,
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

  return { saveCampaignEmail, loading, error, success };
};


export default useSaveCampaignEmail;
