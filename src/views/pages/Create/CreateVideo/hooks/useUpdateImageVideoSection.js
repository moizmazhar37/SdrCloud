import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useUpdateVideoSection = () => {
  const [loading, setLoading] = useState(false);

  const updateVideoSection = async (
    sectionId,
    {
      hvoTemplateId,
      sectionName,
      sectionNumber,
      sequence,
      duration,
      audioEmbedded,
      scroll,
      audioDescription,
      firstRowValue,
      value,
      link,
      isDynamic,
      file,
      audio,
    }
  ) => {
    const formData = new FormData();

    // Only append the fields that are provided
    if (hvoTemplateId) formData.append("hvo_template_id", hvoTemplateId);
    if (sectionName) formData.append("section_name", sectionName);
    if (sectionNumber) formData.append("section_number", sectionNumber);
    if (sequence) formData.append("sequence", sequence);
    if (audioEmbedded !== undefined)
      formData.append("audio_embedded", audioEmbedded ? "true" : "false");
    if (isDynamic !== undefined)
      formData.append("is_dynamic", isDynamic ? "true" : "false");
    if (audioDescription)
      formData.append("audio_description", audioDescription);
    if (duration) formData.append("duration", duration);
    if (scroll !== undefined)
      formData.append("scroll", scroll ? "true" : "false");
    if (firstRowValue) formData.append("first_row_value", firstRowValue);
    if (value) formData.append("value", value);
    if (link) formData.append("link", link);
    if (file) formData.append("file", file);
    if (audio instanceof File) formData.append("audio", audio);

    setLoading(true);

    try {
      const response = await axios({
        method: "PATCH",
        url: `${ApiConfig.createVideoTemplateReferral}/${sectionId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      toast.success("Video section updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error details:", error.response?.data);
      toast.error(
        error.response?.data?.detail?.[0]?.msg ||
          "Failed to update video section."
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateVideoSection, loading };
};

export default useUpdateVideoSection;
