import { useState } from "react";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";

export const useCreateTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTemplate = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Payload received:", payload); // Debugging log
      const transformedPayload = {
        hvoTemplateName: payload.templateName,
        categoryId: payload.categoryId,
        templateType: payload?.templateType ?? "VIDEO", // Ensure correct assignment
      };
      console.log("Transformed Payload:", transformedPayload); // Debugging log

      const response = await Axios({
        url: `${ApiConfig.createVdoTemplate}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: transformedPayload,
      });

      toast.success(
        response?.data?.message || "Template created successfully!"
      );
      return response.data;
    } catch (err) {
      console.error("Error creating template:", err);

      const errorMessage =
        err.response?.data?.message || "Failed to create template.";
      toast.error(errorMessage);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createTemplate, loading, error };
};
