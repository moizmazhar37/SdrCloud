import { useState } from "react";
import axios from "axios";
import { updateFollowupEmail as buildUpdateUrl } from "src/config/APIConfig";

const useUpdateFollowupEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Map frontend action values to backend action values
  const getActionKey = (action) => {
    const actionMap = {
      email: "OPEN",
      video: "CLICK",
    };
    return actionMap[action] || action;
  };

  const updateFollowupEmail = async ({
    subject,
    message,
    isHtml,
    followupEmailId, // Changed from templateId to be more explicit
    action,
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const url = buildUpdateUrl(followupEmailId);
      const response = await axios.patch(
        url,
        {
          subject,
          body: message,
          is_html: isHtml,
          action: getActionKey(action),
          // Remove template_id from the payload as it's not needed for updates
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
      console.error("Failed to update follow up email:", err);

      const backendMessage =
        err?.response?.data?.detail || "Failed to update follow up email.";

      setError(backendMessage);
      throw new Error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateFollowupEmail, loading, error, success };
};

export default useUpdateFollowupEmail;
