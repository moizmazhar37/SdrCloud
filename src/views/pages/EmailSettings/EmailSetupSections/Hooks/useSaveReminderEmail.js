import { useState } from "react";
import axios from "axios";
import { reminderEmail } from "src/config/APIConfig";

const TEMPLATE_ID = "b8e2a652-350b-42d5-b09e-9a0e4d345ccf";

const useSaveReminderEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const saveReminderEmail = async ({ subject, message, isHtml, send_days, existingTemplates = [] }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const maxSequence = existingTemplates.reduce(
      (max, template) => Math.max(max, template.sequence || 0),
      0
    );

    const nextSequence = maxSequence + 1;

    try {
      const response = await axios.post(
        reminderEmail,
        [
          {
            subject,
            body: message,
            is_html: isHtml,
            template_id: TEMPLATE_ID,
            sequence: nextSequence,
            send_after_days: send_days,
          },
        ],
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
      console.error("Failed to save reminder email:", err);
      const backendMessage =
        err?.response?.data?.detail || "Failed to save reminder email.";
      setError(backendMessage);
      throw new Error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return { saveReminderEmail, loading, error, success };
};

export default useSaveReminderEmail;