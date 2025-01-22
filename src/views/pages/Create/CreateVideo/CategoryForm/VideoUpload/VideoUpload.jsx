import React, { useState, useRef } from "react";
import styles from "./VideoUpload.module.scss";
import CategoryDropdown from "../../CategoryDropdown/CategoryDropdown";
import useCreateVideoSection from "../../../Hooks/useCreateVideoSection";
import { toast } from "react-toastify";

const VideoUpload = ({
  categories,
  templateId,
  sectionNumber,
  onSaveSuccess,
  onClose, // New prop for closing the component
}) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [duration, setDuration] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [audioDescription, setAudioDescription] = useState(false);
  const [scroll, setScroll] = useState(null);
  const [dropdownKey, setDropdownKey] = useState(0);

  const { createVideoSection, loading } = useCreateVideoSection();
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoURL("");
      setVideoPreview(URL.createObjectURL(file));
      setSelectedCategory(null);
      setDropdownKey((prev) => prev + 1); // Reset dropdown when video is uploaded
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleCategorySelect = (value, label) => {
    setVideoURL(value);
    setVideoFile(null);
    setVideoPreview(value);
    setSelectedCategory(label);
  };

  const handleVideoURLChange = (e) => {
    const url = e.target.value;
    setVideoURL(url);
    setVideoFile(null);
    setVideoPreview(url);
    setSelectedCategory(null);
    setDropdownKey((prev) => prev + 1); // Reset dropdown on URL change
  };

  const handleUploadAudio = () => {
    audioInputRef.current?.click();
  };

  const handleAddDescription = () => {
    setAudioDescription(!audioDescription);
  };

  const handleSave = async () => {
    if (!isFormValid()) return;

    const videoSectionData = {
      hvoTemplateId: templateId,
      sectionName: selectedCategory || "VIDEO URL",
      sectionNumber: 4,
      sequence: sectionNumber,
      duration: duration,
      audioEmbedded: !!audioFile,
      scroll: scroll,
      audioDescription: audioDescription,
      firstRowValue: null,
      isDynamic: !!selectedCategory,
      file: videoFile,
      value: selectedCategory ? videoURL : null,
      audio: audioFile,
    };

    try {
      const response = await createVideoSection(videoSectionData);
      if (response) {
        onSaveSuccess();
        toast.success("Video section saved successfully");
        onClose();
      }
    } catch (error) {
      toast.error("Failed to save video section");
    }
  };

  const isFormValid = () => {
    return (videoFile || videoURL.trim() !== "") && duration.trim() !== "";
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.backLink}>
            Upload Video | Element {sectionNumber}
          </span>
        </div>

        <div className={styles.uploadSection}>
          <div className={styles.row}>
            <div className={styles.dropdownContainer}>
              <label>Upload Video or Enter URL</label>
              <div className={styles.uploadField}>
                <input
                  type="text"
                  readOnly={!!videoFile}
                  value={videoFile?.name || videoURL}
                  onChange={!videoFile ? handleVideoURLChange : undefined}
                  placeholder="Upload video or enter URL"
                  className={styles.uploadInput}
                />
                <button
                  className={styles.chooseButton}
                  onClick={() => videoInputRef.current?.click()}
                >
                  Choose
                </button>
              </div>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className={styles.hiddenInput}
              />
            </div>

            <div className={styles.dropdownContainer}>
              <label>Select Video URL</label>
              <CategoryDropdown
                key={dropdownKey}
                options={categories}
                buttonText="Select Video URL"
                onSelect={(value, label) => handleCategorySelect(value, label)}
                allowAddNew={false}
              />
            </div>
          </div>

          {videoPreview && (
            <div className={styles.previewContainer}>
              <video
                src={videoPreview}
                controls
                className={styles.videoPreview}
              />
            </div>
          )}

          <div className={styles.row}>
            <div className={styles.durationContainer}>
              <label>Duration (sec)</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="00"
                className={styles.durationInput}
              />
            </div>

            <div className={styles.audioContainer}>
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                className={styles.hiddenInput}
              />
              <div className={styles.audioButtons}>
                <div className={styles.audioActions}>
                  <button
                    className={styles.uploadButton}
                    onClick={handleUploadAudio}
                  >
                    Upload Audio
                  </button>
                  <button
                    className={`${styles.descriptionButton} ${
                      audioDescription ? styles.active : ""
                    }`}
                    onClick={handleAddDescription}
                  >
                    Add Audio Description
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button
              className={`${styles.saveButton} ${
                !isFormValid() || loading ? styles.disabled : ""
              }`}
              disabled={!isFormValid() || loading}
              onClick={handleSave}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
