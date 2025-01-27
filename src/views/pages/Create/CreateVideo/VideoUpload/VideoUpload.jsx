import React, { useState, useRef, useEffect } from "react";
import styles from "./VideoUpload.module.scss";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import AudioDescModal from "src/Common/AudioDescModal/AudioDescModal";
import useCreateVideoSection from "../../Hooks/useCreateVideoSection";
import useUpdateVideoSection from "../hooks/useUpdateVideoSection";
import { toast } from "react-toastify";

const VideoUpload = ({
  categories,
  audioCategories,
  templateId,
  sectionNumber,
  onSaveSuccess,
  onClose,
  editData,
  onEditReset,
}) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [duration, setDuration] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [audioDescription, setAudioDescription] = useState("");
  const [scroll, setScroll] = useState(null);
  const [dropdownKey, setDropdownKey] = useState(0);
  const [showAudioDescModal, setShowAudioDescModal] = useState(false);

  const { createVideoSection, loading: createLoading } =
    useCreateVideoSection();
  const { updateVideoSection, loading: updateLoading } =
    useUpdateVideoSection(); // Loading state for update
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);

  // Initialize form with edit data if available
  useEffect(() => {
    if (editData) {
      if (editData.value) {
        setVideoURL(editData.value);
        setVideoPreview(editData.value);
        setSelectedCategory(editData.section_name);
      } else {
        setVideoPreview(editData.previewContent);
      }

      setDuration(editData.duration || "");
      setAudioDescription(editData.audioDescription || "");
      setScroll(editData.scroll || false);
      setAudioFile(editData.audio || null);
    } else {
      // Reset form when not in edit mode
      setVideoFile(null);
      setVideoURL("");
      setVideoPreview("");
      setAudioFile(null);
      setDuration("");
      setSelectedCategory(null);
      setAudioDescription("");
      setScroll(null);
      setDropdownKey((prev) => prev + 1);
    }
  }, [editData]);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoURL("");
      setVideoPreview(URL.createObjectURL(file));
      setSelectedCategory(null);
      setDropdownKey((prev) => prev + 1);
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
    setDropdownKey((prev) => prev + 1);
  };

  const handleUploadAudio = () => {
    audioInputRef.current?.click();
  };

  const handleAddDescription = () => {
    setShowAudioDescModal(true);
  };

  const handleAudioDescriptionSave = (description) => {
    setAudioDescription(description);
    setShowAudioDescModal(false);
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

    // If we're editing, include the section ID
    if (editData) {
      videoSectionData.id = editData.id;
    }

    try {
      let response;
      if (editData) {
        response = await updateVideoSection(editData.id, videoSectionData);
      } else {
        response = await createVideoSection(videoSectionData);
      }

      if (response) {
        onSaveSuccess();
        toast.success(
          `Video section ${editData ? "updated" : "saved"} successfully`
        );
        onClose();
      }
    } catch (error) {
      toast.error(`Failed to ${editData ? "update" : "save"} video section`);
    }
  };

  const isFormValid = () => {
    return (
      (videoFile || videoURL.trim() !== "") && String(duration).trim() !== ""
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span
            className={styles.backLink}
            onClick={() => {
              if (!editData) {
                onEditReset?.();
              }
            }}
          >
            {editData
              ? `Edit Video | Element ${sectionNumber}`
              : `Upload Video | Element ${sectionNumber}`}
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
                initialValue={editData?.value}
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
                !isFormValid() || createLoading || updateLoading
                  ? styles.disabled
                  : ""
              }`}
              disabled={!isFormValid() || createLoading || updateLoading}
              onClick={handleSave}
            >
              {createLoading || updateLoading
                ? "Saving..."
                : editData
                ? "Update"
                : "Save"}
            </button>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>

      {showAudioDescModal && (
        <AudioDescModal
          dynamicFields={audioCategories}
          onSave={handleAudioDescriptionSave}
          onClose={() => setShowAudioDescModal(false)}
        />
      )}
    </div>
  );
};

export default VideoUpload;
