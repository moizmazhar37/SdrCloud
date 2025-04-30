import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useSaveHighlightBanner2 = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveHighlightBanner2 = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.highlightBanner2Section, // Endpoint for HighlightBanner2
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: {
          hvoTemplateId: data.hvoTemplateId || "",
          sequence: data.sequence || 0,
          ctaButtonText: data.ctaButtonText || "",
          bannerText: data.bannerText || "",
          bannerColor: data.bannerColor || "",
          bannerTextColor: data.bannerTextColor || "",
          banner2TextSize: parseInt(data.bannerTextSize) || 0,
          staticUrl: data.staticUrl || "",
          bannerButtonColor: "",
          bannerButtonTextColor: data.bannerButtonTextColor || "",
          ctaButtonColor: data.ctaButtonColor || "",
        },
      });

      toast.success("Banner saved successfully!");
      return response.data;
    } catch (err) {
      setError(err.message || "Failed to save banner");
      toast.error(err.message || "Failed to save banner. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveHighlightBanner2,
    loading,
    error,
  };
};

export default useSaveHighlightBanner2;
