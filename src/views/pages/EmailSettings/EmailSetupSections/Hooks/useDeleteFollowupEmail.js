import { useState } from "react";
import axios from "axios";
import { deleteFollowupEmail as buildDeleteUrl } from "src/config/APIConfig";

const useDeleteFollowupEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteFollowupEmail = async (templateId) => {
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
      console.error("Failed to delete follow up email:", err);

      const backendMessage =
        err?.response?.data?.detail || "Failed to delete follow up email.";

      setError(backendMessage);
      throw new Error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return { deleteFollowupEmail, loading, error, success };
};

export default useDeleteFollowupEmail;
