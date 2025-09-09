import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";
import StaticURL from "../../../CreateVideo/StaticURL/StaticURL";

const useUpdateHighlightBanner2 = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateHighlightBanner2 = async (data, sectionId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method: "PATCH",
        url: `${ApiConfig.highlightBanner2Section}/${sectionId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: {
          ctaButtonText: data.ctaButtonText,
          bannerText: data.bannerText,
          ctaButtonColor: data.ctaButtonColor,
          bannerColor: data.bannerColor,
          bannerButtonColor: "",
          staticUrl: data.staticUrl,
          bannerTextColor: data.bannerTextColor,
          bannerButtonTextColor: data.bannerButtonTextColor,
          banner2TextSize: parseInt(data.bannerTextSize) || 0,
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
    updateHighlightBanner2,
    loading,
    error,
  };
};

export default useUpdateHighlightBanner2;
