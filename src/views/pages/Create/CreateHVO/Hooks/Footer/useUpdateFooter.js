import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useUpdateFooter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFooter = async (sectionId, data) => {
    setLoading(true);
    setError(null);

    const payload = {
      hvoTemplateId: data.templateId || null,
      sequence: data.sequence || null,
      footer_links: data.selectedFooterLinks || null,
      footerBackgroundColor: data.footerBackgroundColor || null,
      footerTextHeadingColor: data.footerTextHeadingColor || null,
      footerHeadingSize: data.footerHeadingSize
        ? parseInt(data.footerHeadingSize)
        : null,
      footerTextColor: data.footerTextColor || null,
      footerTextHoverColor: data.footerTextHoverColor || null,
      footerTextSize: data.footerTextSize
        ? parseInt(data.footerTextSize)
        : null,
      socialIconBackgroundColor: data.socialIconBackgroundColor || null,
      socialIconColor: data.socialIconColor || null,
      benchmarkColor: data.benchmarkColor || null,
      benchmarkSize: data.benchmarkSize ? parseInt(data.benchmarkSize) : null,
      instagramLink: data.instagramLink || null,
      facebookLink: data.facebookLink || null,
      linkedinLink: data.linkedinLink || null,
    };

    // Remove null values
    Object.keys(payload).forEach((key) => {
      if (payload[key] === null) {
        delete payload[key];
      }
    });

    try {
      const response = await axios({
        method: "PATCH",
        url: `${ApiConfig.footerSection}/${sectionId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: payload,
      });

      toast.success("Footer updated successfully.");
      return response.data;
    } catch (err) {
      setError(err.message || "Failed to update footer");
      toast.error(err.message || "Failed to update footer");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateFooter,
    loading,
    error,
  };
};

export default useUpdateFooter;
