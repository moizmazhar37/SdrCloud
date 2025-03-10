import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useCreateVideo = () => {
  const [isLoading, setLoading] = useState(false);

  const handleCreateVideo = async (templateId) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: `${ApiConfig.createVideo}/${templateId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res?.status === 200) {
        console.log(res?.data, "creationstatus");
        toast.success("Video creation started successfully!");
      }
    } catch (error) {
      console.error(error, "error");
      toast.error("Video creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateVideo, isLoading };
};

export default useCreateVideo;
