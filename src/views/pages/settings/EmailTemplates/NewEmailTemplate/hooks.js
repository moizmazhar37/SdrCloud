import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig, { emailTemplate } from "src/config/APIConfig";

// Hook to fetch data types based on templateId
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

// Function to create or update an email template
export const useSaveEmailTemplate = () => {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [success, setSuccess] = useState(false);

  const saveTemplate = async ({ name, body, subject, template_id, isUpdate }) => {
    setSaving(true);
    setSaveError(null);
    setSuccess(false);

    try {
      const url = isUpdate ? `${emailTemplate}/${template_id}` : emailTemplate;
      const method = isUpdate ? "patch" : "post";
      const requestData = { name, body, subject };

      await axios({
        method,
        url,
        data: requestData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      setSuccess(true);
    } catch (err) {
      setSaveError(err);
    } finally {
      setSaving(false);
    }
  };

  return { saveTemplate, saving, saveError, success };
};
