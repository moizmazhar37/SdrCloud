import { useState } from "react";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

export const useUpdateVideoSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateVideoSection = async (sectionId, data) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("template_id", data.template_id);
      formData.append("sequence", data.sequence);
      formData.append("section_name", data.section_name);

      // Handle video upload vs URL
      if (data.file) {
        formData.append("file", data.file);
      } else if (data.video_url) {
        formData.append("video", data.video_url);
      }

      const response = await fetch(
        `${ApiConfig.hvoVideoSection}/${sectionId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update video section");
      }

      const result = await response.json();
      toast.success("Video section updated successfully");
      return result;
    } catch (err) {
      const errorMessage =
        err.message || "An error occurred while updating the video section";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateVideoSection,
    isLoading,
    error,
  };
};
