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
    isDynamic = null,
    file = null,
    audio = null,
  }) => {
    const formData = new FormData();

    formData.append("hvo_template_id", hvoTemplateId ?? null);
    formData.append("section_name", sectionName ?? null);
    formData.append("section_number", sectionNumber ?? null);
    formData.append("sequence", sequence ?? 1);
    formData.append("audio_embedded", audioEmbedded ?? false);
    formData.append("is_dynamic", isDynamic ?? false);
    formData.append("duration", duration ?? null);
    formData.append("scroll", scroll ?? null);
    formData.append("audio_description", audioDescription ?? null);
    formData.append("first_row_value", firstRowValue ?? null);
    formData.append("value", value ?? null);
    formData.append("file", file ?? null);
    formData.append("audio", audio ?? null);

    setLoading(true);

    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.createVideoTemplateReferral,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formData,
      });
      toast.success("Video section created successfully!");
      return response.data;
    } catch (error) {
      toast.error(error.message || "Failed to create video section.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createVideoSection, loading };
};

export default useCreateVideoSection;
