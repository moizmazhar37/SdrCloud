import { useState } from "react";
import axios from "axios";
import { url } from "src/config/APIConfig";

const useActivateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activateUser = async (userId, onSuccess) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${url}/subadmin/users/reminder-email/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send activation reminder"
      );
      console.error("Error sending activation reminder:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    activateUser,
    isLoading,
    error,
  };
};

export default useActivateUser;
