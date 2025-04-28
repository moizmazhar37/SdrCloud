import { useState } from "react";
import axios from "axios";
import { admin } from "src/config/APIConfig"; // Adjust path as needed

// Custom hook for admin API calls
export const useAdminApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const verifyOtp = async (otp, token) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Since the API uses a GET method with otp as a query parameter
      const response = await axios.get(`${admin}/verify-otp`, {
        params: { otp },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(true);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || "Failed to verify OTP";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    verifyOtp,
  };
};

export default useAdminApi;
