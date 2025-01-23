import React, { useState, useRef } from "react";
import styles from "./ImageUpload.module.scss";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import useCreateVideoSection from "../../Hooks/useCreateVideoSection";
import { toast } from "react-toastify";
import AudioDescModal from "src/Common/AudioDescModal/AudioDescModal";

const ImageUpload = ({
  categories,
  audioCategories,
  templateId,
  sectionNumber,
  onSaveSuccess,
  onClose,
}) => {
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [duration, setDuration] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [audioDescription, setAudioDescription] = useState("");
  const [scroll, setScroll] = useState(null);
  const [dropdownKey, setDropdownKey] = useState(0);
  const [showAudioDescModal, setShowAudioDescModal] = useState(false);

  const { createVideoSection, loading } = useCreateVideoSection();
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageURL("");
      setImagePreview(URL.createObjectURL(file));
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
    setImageURL(value);
    setImageFile(null);
    setImagePreview(value);
    setSelectedCategory(label);
  };

  const handleImageURLChange = (e) => {
    const url = e.target.value;
    setImageURL(url);
    setImageFile(null);
    setImagePreview(url);
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
      sectionName: selectedCategory || "IMAGE URL",
      sectionNumber: 3,
      sequence: sectionNumber,
      duration: duration,
      audioEmbedded: !!audioFile,
      scroll: scroll,
      audioDescription: audioDescription,
      firstRowValue: null,
      isDynamic: !!selectedCategory,
      file: imageFile,
      value: selectedCategory ? imageURL : null,
      audio: audioFile,
    };

    try {
      const response = await createVideoSection(videoSectionData);
      if (response) {
        onSaveSuccess();
        toast.success("Image section saved successfully");
        onClose();
      }
    } catch (error) {
      toast.error("Failed to save image section");
    }
  };

  const isFormValid = () => {
    return (imageFile || imageURL.trim() !== "") && duration.trim() !== "";
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.backLink}>Upload Image | Element 1</span>
        </div>

        <div className={styles.uploadSection}>
          <div className={styles.row}>
            <div className={styles.imageUploadContainer}>
              <label>Upload Image or Enter URL</label>
              <div className={styles.uploadField}>
                <input
                  type="text"
                  readOnly={!!imageFile}
                  value={imageFile?.name || imageURL}
                  onChange={!imageFile ? handleImageURLChange : undefined}
                  placeholder="Upload image or enter URL"
                  className={styles.uploadInput}
                />
                <button
                  className={styles.chooseButton}
                  onClick={() => imageInputRef.current?.click()}
                >
                  Choose
                </button>
              </div>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={styles.hiddenInput}
              />
            </div>

            <div className={styles.dropdownContainer}>
              <label>Select Image URL</label>
              <CategoryDropdown
                key={dropdownKey}
                options={categories}
                buttonText="Select Image URL"
                onSelect={(value, label) => handleCategorySelect(value, label)}
                allowAddNew={false}
              />
            </div>
          </div>

          {imagePreview && (
            <div className={styles.previewContainer}>
              <img
                src={imagePreview}
                alt="Preview"
                className={styles.imagePreview}
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
      <div className={styles.audioModal}></div>
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

export default ImageUpload;
