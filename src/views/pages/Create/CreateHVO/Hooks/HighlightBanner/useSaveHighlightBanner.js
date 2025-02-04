import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useSaveHighlightBanner = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveHighlightBanner = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.higlightBannerSection,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: {
          hvoTemplateId: data.templateId || "",
          sequence: data.sequence || 0,
          cta_button_text: data.ctaButtonText || "",
          bannerText: data.bannerText || "",
          scroll: data.scroll === "yes",
          bannerColor: data.bannerColor || "",
          bannerTextColor: data.bannerTextColor || "",
          bannerTextSize: parseInt(data.bannerTextSize) || 0,
        },
      });

      toast.success("Banner saved successfully!");
      return response.data;
    } catch (err) {
      setError(err.message || "Failed to save banner");
      toast.error(err.message || "Failed to save banner");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveHighlightBanner,
    loading,
    error,
  };
};

export default useSaveHighlightBanner;
