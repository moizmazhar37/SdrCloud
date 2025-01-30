import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useCreateVideoSection = () => {
  const [loading, setLoading] = useState(false);

  const createVideoSection = async ({
    hvoTemplateId = null,
    sectionName = null,
    sectionNumber = null,
    sequence = null,
    duration = null,
    audioEmbedded = null,
    scroll = null,
    audioDescription = null,
    firstRowValue = null,
    value = null,
    link = null,
    isDynamic = null,
    file = null,
    audio = null,
  }) => {
    const formData = new FormData();

    formData.append("hvo_template_id", hvoTemplateId || "");
    formData.append("section_name", sectionName || "");
    formData.append("section_number", sectionNumber || "");
    formData.append("sequence", sequence || 1);

    formData.append("audio_embedded", audioEmbedded ? "true" : "false");
    formData.append("is_dynamic", isDynamic ? "true" : "false");
    formData.append("audio_description", audioDescription || "");

    formData.append("duration", duration || "");
    formData.append("scroll", scroll ? "true" : "false");
    formData.append("first_row_value", firstRowValue || "");
    formData.append("value", value || "");
    formData.append("link", link || "");
    if (file) {
      formData.append("file", file);
    }
    if (audio instanceof File) {
      formData.append("audio", audio);
    }

    setLoading(true);

    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.createVideoTemplateReferral,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      toast.success("Video section created successfully!");
      return response.data;
    } catch (error) {
      console.error("Error details:", error.response?.data);
      toast.error(
        error.response?.data?.detail?.[0]?.msg ||
          "Failed to create video section."
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createVideoSection, loading };
};

export default useCreateVideoSection;
