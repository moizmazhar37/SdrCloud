import { useState } from "react";
import axios from "axios";
import { updateReminderEmail as buildUpdateUrl } from "src/config/APIConfig";

const useUpdateReminderEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateReminderEmail = async ({ subject, message, isHtml, send_days, sequence, templateId }) => {
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
          is_html: isHtml,
          sequence,
          send_after_days: send_days,
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
      console.error("Failed to update reminder email:", err);

      const backendMessage =
        err?.response?.data?.detail || "Failed to update reminder email.";

      setError(backendMessage);
      throw new Error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateReminderEmail, loading, error, success };
};

export default useUpdateReminderEmail;
