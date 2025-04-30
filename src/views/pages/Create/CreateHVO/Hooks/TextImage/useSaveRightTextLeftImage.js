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
    formData.append("hvoTemplateId", data.templateId);
    formData.append("sequence", data.sequence);

    // Optional text fields - only append if they exist
    if (data.bodyText) formData.append("body_text", data.bodyText);
    if (data.headline1) formData.append("headline1", data.headline1);
    if (data.headline2) formData.append("headline2", data.headline2);
    if (data.bodyTextColor)
      formData.append("body_text_color", data.bodyTextColor);
    if (data.bodyTextSize) formData.append("body_text_size", data.bodyTextSize);
    if (data.headline1Color)
      formData.append("headline1_color", data.headline1Color);
    if (data.headline1Size)
      formData.append("headline1_size", data.headline1Size);
    if (data.headline2Color)
      formData.append("headline2_color", data.headline2Color);
    if (data.headline2Size)
      formData.append("headline2_size", data.headline2Size);
    if (data.ctaUrl)
        formData.append("cta_button_text", data.ctaUrl);

    // Handle image upload
    if (data.image instanceof File) {
      formData.append("file", data.image);
      formData.append("leftImageRightText", null);
    } else if (typeof data.image === "string") {
      formData.append("leftImageRightText", data.image);
      // formData.append("file", null);
    }

    // Always append empty static_image
    formData.append("static_image", "");

    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.rightTextLeftImageSection,
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
        err.response?.data?.message || err.message || "Failed to save section. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
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
