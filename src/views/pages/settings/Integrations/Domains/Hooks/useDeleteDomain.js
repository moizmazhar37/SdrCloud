import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { domain as baseUrl } from "src/config/APIConfig";

const useDeleteDomain = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteDomain = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${baseUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Domain deleted successfully");
      return response.data;
    } catch (err) {
      console.error("Delete error:", err);
      setError(err);
      toast.error("Failed to delete domain");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteDomain, loading, error };
};

export default useDeleteDomain;
