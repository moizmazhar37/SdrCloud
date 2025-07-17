import { useState } from "react";
import axios from "axios";
import { url } from "src/config/APIConfig";

const useUploadAudio = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const uploadAudio = async ({ file, templateId, audioDescription, voiceModel }) => {
    if (!file && !audioDescription) {
      setError("Either audio file or audio description is required.");
      return null;
    }

    if (!templateId) {
      setError("Template ID is required.");
      return null;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      if (file) formData.append("audio_file", file);
      if (audioDescription) formData.append("audio_description", audioDescription);
      if (voiceModel) formData.append("audio_accent", voiceModel);

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${url}/templates/upload-audio/${templateId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;
      setAudioUrl(data.audio);
      return data.audio;
    } catch (err) {
      const msg =
        err.response?.data?.detail || err.message || "Unknown error occurred";
      console.error("Upload error:", msg);
      setError(msg);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadAudio, uploading, error, audioUrl };
};

export default useUploadAudio;
