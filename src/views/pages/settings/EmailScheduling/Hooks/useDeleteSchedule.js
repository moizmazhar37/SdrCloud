import { useState } from "react";
import axios from "axios";
import { emailTemplate } from "src/config/APIConfig";

const useDeleteSchedule = () => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteSchedule = async (templateId) => {
    const token = localStorage.getItem("token");
    const url = `${emailTemplate}/${templateId}`;

    setDeleting(true);
    setError(null);

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      setError(err);
      console.error("Failed to delete schedule:", err);
      throw err;
    } finally {
      setDeleting(false);
    }
  };

  return { deleteSchedule, deleting, error };
};

export default useDeleteSchedule;
