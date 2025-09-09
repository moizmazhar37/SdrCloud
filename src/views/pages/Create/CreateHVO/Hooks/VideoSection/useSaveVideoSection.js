import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

export const useSaveVideoSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveVideoSection = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      // Add required fields
      formData.append("template_id", data.template_id);
      formData.append("sequence", data.sequence);
      formData.append("section_name", data.section_name);
      // Handle video upload vs URL
      if (data.file) {
        formData.append("file", data.file);
      } else if (data.video_url) {
        formData.append("video", data.video_url);
      }

      const response = await fetch(ApiConfig.hvoVideoSection, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save video section. Error: " + errorData.message);
      }

      const result = await response.json();
      toast.success("Video section saved successfully");
      return result;
    } catch (err) {
      const errorMessage =
        err.message || "An error occurred while saving the video section. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveVideoSection,
    isLoading,
    error,
  };
};
