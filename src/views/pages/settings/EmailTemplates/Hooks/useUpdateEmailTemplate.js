import { useState } from "react";
import axios from "axios";
import { tenantEmailTemplate } from "src/config/APIConfig";

const useUpdateEmailTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateEmailTemplate = async (templateId, requestData, token) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${tenantEmailTemplate}/${templateId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error.response.error);
    }
  };

  return { updateEmailTemplate, loading, error };
};

export default useUpdateEmailTemplate;
