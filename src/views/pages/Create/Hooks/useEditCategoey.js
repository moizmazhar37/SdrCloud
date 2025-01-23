import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { templates } from "src/config/APIConfig";

const useEditCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editCategory = async (templateId, categoryId, templateName) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${templates}/${templateId}`;
      const payload = {
        category_id: categoryId,
        template_name: templateName,
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.patch(url, payload, { headers });
      toast.success("Template updated successfully!");
    } catch (err) {
      setError(err);
      toast.error("Failed!", err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { editCategory, loading, error };
};

export default useEditCategory;
