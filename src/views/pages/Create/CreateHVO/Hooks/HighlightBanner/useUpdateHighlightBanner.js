// useUpdateHighlightBanner.js
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useUpdateHighlightBanner = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateHighlightBanner = async (data, sectionId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method: "PATCH",
        url: `${ApiConfig.higlightBannerSection}/${sectionId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: {
          bannerText: data.bannerText,
          scroll: data.scroll === "yes",
          bannerColor: data.bannerColor,
          bannerTextColor: data.bannerTextColor,
          bannerTextSize: parseInt(data.bannerTextSize) || 0,
        },
      });

      toast.success("Banner updated successfully!");
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to update banner";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateHighlightBanner,
    loading,
    error,
  };
};

export default useUpdateHighlightBanner;
