import { auth } from "src/config/APIConfig";
import { useState } from "react";

export const useSetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const setPassword = async (password) => {
    try {
      setLoading(true);
      setError(null);

      // Extract token from the URL path
      const pathParts = window.location.pathname.split("/");
      const token = pathParts[pathParts.length - 1];

      if (!token) {
        throw new Error("No token found in URL");
      }

      const response = await fetch(`${auth}/set-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to set password");
      }

      const data = await response.json();
      setSuccess(true);
      return data;
    } catch (err) {
      setError(err.message || "An error occurred while setting the password");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { setPassword, loading, success, error };
};

export default useSetPassword;
