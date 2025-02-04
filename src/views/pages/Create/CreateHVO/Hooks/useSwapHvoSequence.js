import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { hvoelement } from "src/config/APIConfig";

const useSwapHvoSequence = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const swapSequence = async (sections) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Something went wrong.");
      }

      if (!Array.isArray(sections) || sections.length === 0) {
        toast.error("Invalid payload.");
      }

      const response = await axios.patch(
        `${hvoelement}/drag-and-drop`,
        sections,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setData(response.data);
      toast.success("Sequence swapped successfully!");
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail?.[0]?.msg ||
        err.response?.data?.message ||
        err.message ||
        "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { swapSequence, loading, error, data };
};

export default useSwapHvoSequence;
