import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { domain as baseUrl } from "src/config/APIConfig";

const useAuthenticateDomain = () => {
  const [loading, setLoading] = useState(false);

  const authenticateDomain = async (domainValue) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseUrl}/authenticate`,
        { domain: domainValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response?.data?.message || "Authenticated successfully");
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.domain || "Authentication failed";
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { authenticateDomain, loading };
};

export default useAuthenticateDomain;
