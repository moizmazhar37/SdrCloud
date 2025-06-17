import { useState } from "react";
import axios from "axios";
import { followupEmail } from "src/config/APIConfig";


const useSaveFollowupEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const saveFollowupEmail = async ({ subject, message, isHtml, action, templateId}) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        followupEmail,
        {
          subject,
          body: message,
          is_html: isHtml,
          template_id: templateId,
          action: action,
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
      console.error("Failed to save follow-up email:", err);

      const backendMessage =
        err?.response?.data?.detail || "Failed to save follow-up email.";

      setError(backendMessage);
      throw new Error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return { saveFollowupEmail, loading, error, success };
};

export default useSaveFollowupEmail;
