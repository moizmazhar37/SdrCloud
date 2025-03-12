//Preview video with sheet data

import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const usePreviewVideo = () => {
  const [loading, setLoading] = useState(false);

  const previewVideo = async (videoTemplateId) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${ApiConfig.previewVideo}/${videoTemplateId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Video preview will be generated shortly!");
      return response.data;
    } catch (error) {
      console.error("Error details:", error.response?.data);
      toast.error(
        error.response?.data?.detail?.[0]?.msg ||
          "Failed to fetch video preview."
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { previewVideo, loading };
};

export default usePreviewVideo;
