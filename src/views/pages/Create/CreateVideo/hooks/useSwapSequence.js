import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useSwapSequence = (sectionId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const swapSequence = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      // Using the section UUID in the path
      const response = await axios.patch(
        `${ApiConfig.createVideoTemplateReferral}/swap-sequence`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setData(response.data);
      toast.success("Sequence swapped successfully!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail?.[0]?.msg ||
        err.response?.data?.message ||
        "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { swapSequence, loading, error, data };
};

export default useSwapSequence;
