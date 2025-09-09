import { useState } from "react";
import axios from "axios";
import { deleteReminderEmail as buildDeleteUrl } from "src/config/APIConfig";

const useDeleteReminderEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteReminderEmail = async (templateId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const url = buildDeleteUrl(templateId);
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccess(true);
      return response.data;
    } catch (err) {
      console.error("Failed to delete reminder email:", err);

      const backendMessage =
        err?.response?.data?.detail || "Failed to delete reminder email.";

      setError(backendMessage);
      throw new Error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return { deleteReminderEmail, loading, error, success };
};

export default useDeleteReminderEmail;
