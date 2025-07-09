import { useState } from "react";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";

export const useConnectSheet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const connectSheet = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios({
        url: `${ApiConfig.connectSheetTOTemplateVideo}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: payload,
      });

      toast.success(response?.data?.message || "Sheet connected successfully.");
    } catch (err) {
      console.error("Error connecting sheet:", err);

      const errorMessage =
        err.response?.data?.detail || "Failed to connect sheet.";
      toast.error(errorMessage);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { connectSheet, loading, error };
};
