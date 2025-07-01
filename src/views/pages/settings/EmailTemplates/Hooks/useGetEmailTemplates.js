import { useState, useEffect } from "react";
import axios from "axios";
import { tenantEmailTemplate } from "src/config/APIConfig";

const useGetEmailTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTemplates = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(tenantEmailTemplate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTemplates(response.data);
    } catch (err) {
      setError(err.response?.error || "Failed to fetch templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return { templates, loading, error, refetch: fetchTemplates };
};

export default useGetEmailTemplates;
