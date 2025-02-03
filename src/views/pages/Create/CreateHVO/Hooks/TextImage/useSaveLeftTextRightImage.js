import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useSaveTextImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveTextImage = async (data) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("template_id", data.templateId);
    formData.append("sequence", data.sequence);
    formData.append("body_text", data.bodyText);
    formData.append("headline1", data.headline1);
    formData.append("headline2", data.headline2);
    formData.append("body_text_color", data.bodyTextColor);
    formData.append("body_text_size", data.bodyTextSize);
    formData.append("headline1_color", data.headline1Color);
    formData.append("headline1_size", data.headline1Size);
    formData.append("headline2_color", data.headline2Color);
    formData.append("headline2_size", data.headline2Size);

    // Handle both file uploads and URL strings
    if (data.image instanceof File) {
      formData.append("file", data.image);
    } else if (typeof data.image === "string") {
      formData.append("left_image_right_text", data.image);
    }

    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.leftTextRightImageSection,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      toast.success("Section saved successfully!");
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to save section";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveTextImage,
    loading,
    error,
  };
};

export default useSaveTextImage;
