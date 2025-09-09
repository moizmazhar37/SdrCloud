import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useSaveFooter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveFooter = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.footerSection,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: {
          hvoTemplateId: data.templateId || "",
          sequence: data.sequence || 0,
          footer_links: data.selectedFooterLinks || [],
          footerBackgroundColor: data.footerBackgroundColor || "",
          footerTextHeadingColor: data.footerTextHeadingColor || "",
          footerHeadingSize: parseInt(data.footerHeadingSize) || 0,
          footerTextColor: data.footerTextColor || "",
          footerTextHoverColor: data.footerTextHoverColor || "",
          footerTextSize: parseInt(data.footerTextSize) || 0,
          socialIconBackgroundColor: data.socialIconBackgroundColor || "",
          socialIconColor: data.socialIconColor || "",
          benchmarkColor: data.benchmarkColor || "",
          benchmarkSize: parseInt(data.benchmarkSize) || 0,
          instagramLink: data.instagramLink || "",
          facebookLink: data.facebookLink || "",
          linkedinLink: data.linkedinLink || "",
        },
      });

      toast.success("Footer saved successfully.");
      return response.data;
    } catch (err) {
      setError(err.message || "Failed to save footer");
      toast.error(err.message || "Failed to save footer. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveFooter,
    loading,
    error,
  };
};

export default useSaveFooter;
