import React, { useState, useRef, useEffect } from "react";
import styles from "./VideoSection.module.scss";
import { useSaveVideoSection } from "../../Hooks/VideoSection/useSaveVideoSection";
import { useUpdateVideoSection } from "../../Hooks/VideoSection/useUpdateVideoSection";
import CategoryDropdown from "../../../CreateVideo/CategoryDropdown/CategoryDropdown";

const VideoUpload = ({
  dynamicVideos,
  onSectionSave,
  onClose,
  templateId,
  sequence,
  initialData,
}) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const fileInputRef = useRef(null);

  const { saveVideoSection, isLoading: isSaving } = useSaveVideoSection();
  const { updateVideoSection, isLoading: isUpdating } = useUpdateVideoSection();
  const isLoading = isSaving || isUpdating;

  // Transform dynamicVideos array to dropdown format
  const transformedOptions =
    dynamicVideos?.map((item) => ({
      label: item,
      value: item,
    })) || [];

  useEffect(() => {
    if (initialData?.video) {
      // Check if the initial video is from a dynamic category
      const isFromCategory = dynamicVideos?.includes(initialData.video);

      if (isFromCategory) {
        setSelectedCategory(initialData.video);
        setPreviewUrl(""); // No preview for category selections
      } else {
        setVideoUrl(initialData.video);
        setPreviewUrl(initialData.video);
      }
      setIsEditing(true);
    }
  }, [initialData, dynamicVideos]);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
    setPreviewUrl(url);
    // Clear file selection and category when URL is entered
    setVideoFile(null);
    setSelectedCategory(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setVideoFile(file);
      // Clear URL and category when file is selected
      setVideoUrl("");
      setSelectedCategory(null);
    }
  };

  const handleCategorySelect = (value) => {
    setSelectedCategory(value);
    // Clear URL, preview, and file when category is selected
    setVideoUrl("");
    setPreviewUrl("");
    setVideoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChooseClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    // Check if any input method is selected
    if (!videoUrl && !videoFile && !selectedCategory) {
      return;
    }

    try {
      const sectionData = {
        template_id: templateId,
        sequence: sequence,
        section_name: "Video",
        is_active: true,
      };

      // Add appropriate data based on the input method
      if (videoFile) {
        sectionData.file = videoFile;
      } else if (videoUrl) {
        sectionData.video_url = videoUrl;
      } else if (selectedCategory) {
        sectionData.video_url = selectedCategory;
      }

      let result;
      if (isEditing && initialData?.id) {
        result = await updateVideoSection(initialData.id, sectionData);
      } else {
        result = await saveVideoSection(sectionData);
      }

      onSectionSave(result);
      handleClose();
    } catch (error) {
      // Error is already handled by the hook with toast
      console.error("Error saving video section:", error);
    }
  };

  const handleClose = () => {
    setVideoUrl("");
    setPreviewUrl("");
    setVideoFile(null);
    setSelectedCategory(null);
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  return (
    <div className={styles.videoUploadContainer}>
      <div className={styles.header}>
        <h3>{isEditing ? "Edit Video" : "Add Video"}</h3>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter Video URL or Upload From Choose Button"
          value={videoUrl}
          onChange={handleUrlChange}
          className={styles.urlInput}
          disabled={isLoading || selectedCategory}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="video/*"
          className={styles.fileInput}
        />
        <button
          onClick={handleChooseClick}
          className={styles.chooseButton}
          disabled={isLoading || selectedCategory}
        >
          Choose
        </button>
      </div>
      <div className={styles.categoryContainer}>
        <CategoryDropdown
          options={transformedOptions}
          buttonText="Select Video Category"
          onSelect={handleCategorySelect}
          initialValue={selectedCategory}
          disabled={isLoading || videoUrl || videoFile}
        />
      </div>
      {previewUrl && (
        <div className={styles.previewContainer}>
          <video controls className={styles.videoPreview} key={previewUrl}>
            <source src={previewUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {selectedCategory && (
        <div className={styles.categorySelectedIndicator}>
          Selected video category: <strong>{selectedCategory}</strong>
        </div>
      )}
      <div className={styles.actionButtons}>
        <button
          onClick={handleSave}
          className={styles.saveButton}
          disabled={(!videoUrl && !videoFile && !selectedCategory) || isLoading}
        >
          {isLoading ? "Saving..." : isEditing ? "Update" : "Save"}
        </button>
        <button
          onClick={handleClose}
          className={styles.cancelButton}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VideoUpload;
