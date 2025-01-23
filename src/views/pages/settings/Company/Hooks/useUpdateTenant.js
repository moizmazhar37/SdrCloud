import { useState } from "react";
import axios from "axios";
import { tenant } from "src/config/APIConfig";

const useUpdateTenant = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateTenant = async (updatedFields) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");

      // Create FormData if there's a file to upload
      const formData = new FormData();

      // Handle file upload specially
      if (updatedFields.uploadLogo instanceof File) {
        formData.append("uploadLogo", updatedFields.uploadLogo);
        delete updatedFields.uploadLogo;
      }

      // Add other fields to FormData
      Object.keys(updatedFields).forEach((key) => {
        formData.append(key, updatedFields[key]);
      });

      const response = await axios.patch(`${tenant}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while updating tenant information"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateTenant,
    loading,
    error,
    success,
    clearError: () => setError(null),
    clearSuccess: () => setSuccess(false),
  };
};

export default useUpdateTenant;
