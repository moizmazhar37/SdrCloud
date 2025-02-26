import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

export const useDataTypes = (templateId) => {
  const [dataTypes, setDataTypes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!templateId) return; // Avoid API call if no ID is passed

    const fetchDataTypes = async () => {
      try {
        const response = await axios.get(`${ApiConfig.headers}/${templateId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDataTypes(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDataTypes();
  }, [templateId]);

  return { dataTypes, loading, error };
};
