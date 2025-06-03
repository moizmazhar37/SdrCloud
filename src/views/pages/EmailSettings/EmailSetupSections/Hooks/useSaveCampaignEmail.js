// src/hooks/useSaveCampaignEmail.js
import { useState } from "react";
import axios from "axios";
import { campaignEmail } from "src/config/APIConfig";

const TEMPLATE_ID = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

const useSaveCampaignEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const saveCampaignEmail = async ({ subject, message, isHtml }) => {
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
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { saveCampaignEmail, loading, error, success };
};

export default useSaveCampaignEmail;
