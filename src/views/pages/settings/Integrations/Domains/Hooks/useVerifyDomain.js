import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { domain as baseUrl } from "src/config/APIConfig";

const useVerifyDomain = () => {
  const [loading, setLoading] = useState(false);

  const verifyToken = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${baseUrl}/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response?.data?.message || "Verified successfully");
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.detail || "Verification failed";
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { verifyToken, loading };
};

export default useVerifyDomain;
