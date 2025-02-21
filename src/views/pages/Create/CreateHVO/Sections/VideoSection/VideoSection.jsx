import React, { useState, useRef, useEffect } from "react";
import styles from "./VideoSection.module.scss";

const VideoUpload = ({
  onSectionSave,
  onClose,
  templateId,
  sequence,
  initialData,
}) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData?.video_url) {
      setVideoUrl(initialData.video_url);
      setPreviewUrl(initialData.video_url);
      setIsEditing(true);
    }
  }, [initialData]);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
    setPreviewUrl(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setVideoUrl("");
    }
  };

  const handleChooseClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    if (!videoUrl && !previewUrl) {
      return;
    }

    const sectionData = {
      template_id: templateId,
      sequence: sequence,
      section_name: "Video",
      video_url: videoUrl || previewUrl,
      is_active: true,
    };

    onSectionSave(sectionData);
    handleClose();
  };

  const handleClose = () => {
    setVideoUrl("");
    setPreviewUrl("");
    setIsEditing(false);
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
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="video/*"
          className={styles.fileInput}
        />
        <button onClick={handleChooseClick} className={styles.chooseButton}>
          Choose
        </button>
      </div>

      {previewUrl && (
        <div className={styles.previewContainer}>
          <video controls className={styles.videoPreview} key={previewUrl}>
            <source src={previewUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className={styles.actionButtons}>
        <button
          onClick={handleSave}
          className={styles.saveButton}
          disabled={!videoUrl && !previewUrl}
        >
          {isEditing ? "Update" : "Save"}
        </button>
        <button onClick={handleClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VideoUpload;
