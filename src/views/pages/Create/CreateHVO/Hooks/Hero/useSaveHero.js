import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useSaveHeroSection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveHeroSection = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      // Append fields to FormData, including file upload if applicable
      if (data.file) {
        formData.append("file", data.file); // File should be appended as file
      } else {
        formData.append("hero_img", data.hero_img || ""); // Use hero_img URL if no file
      }

      formData.append("hvoTemplateId", data.templateId || "");
      formData.append("sequence", data.sequence || 0);
      
      // Convert sizes to integers before sending to API
      formData.append("headline1Size", parseInt(data.headline1_size) || null);
      formData.append("headline1Color", data.headline1_color || "");
      formData.append("headline1", data.headline1 || "");
      
      formData.append("headline2", data.headline2 || "");
      formData.append("headline2Size", parseInt(data.headline2_size) || null);
      formData.append("headline2Color", data.headline2_color || "");
      
      formData.append("bodyText", data.body_text || "");
      formData.append("bodyTextSize", parseInt(data.body_text_size) || null);
      formData.append("bodyTextColor", data.body_text_color || "");

      formData.append("ctaButtonText", data.cta_button_text || "");
      formData.append("ctaButtonColor", data.cta_button_color || "");
      formData.append("ctaButtonTextColor", data.cta_button_text_color || "");
      formData.append("dynamicUrl", data.dynamic_url || "");

      formData.append("demoButtonText", data.demo_button_text || "");
      formData.append("demoButtonColor", data.demo_button_color || "");
      formData.append("demoButtonTextColor", data.demo_button_text_color || "");
      formData.append("dynamicUrlDemo", data.dynamic_url_demo || "");

      // Send data via API
      const response = await axios({
        method: "POST",
        url: ApiConfig.heroSection,  // API endpoint for saving hero section data
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData, // Sending the FormData object
      });

      toast.success("Hero section saved successfully.");
      return response.data;
    } catch (err) {
      setError(err.message || "Failed to save Hero section");
      toast.error(err.message || "Failed to save Hero section. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveHeroSection,
    loading,
    error,
  };
};

export default useSaveHeroSection;
