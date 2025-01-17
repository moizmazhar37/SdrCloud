import React, { useState, useRef } from "react";
import styles from "./ImageUpload.module.scss";
import CategoryDropdown from "../../CategoryDropdown/CategoryDropdown";
import useCreateVideoSection from "../../../Hooks/useCreateVideoSection";
import { toast } from "react-toastify";

const ImageUpload = ({ categories, templateId, sectionNumber }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [duration, setDuration] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [audioDescription, setAudioDescription] = useState(false);
  const [scroll, setScroll] = useState(null);
  const [isDropdownSelected, setIsDropdownSelected] = useState(false);

  const { createVideoSection, loading } = useCreateVideoSection();
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageURL("");
      setImagePreview(URL.createObjectURL(file));
      setSelectedCategory("");
      setIsDropdownSelected(false);
    }
  };

  const handleImageURLChange = (e) => {
    const url = e.target.value;
    if (!isDropdownSelected) {
      setImageURL(url);
      setImageFile(null);
      setImagePreview(url);
      setSelectedCategory("");
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
    setIsDropdownSelected(true);
  };

  const handleUploadAudio = () => {
    audioInputRef.current?.click();
  };

  const handleAddDescription = () => {
    setAudioDescription(!audioDescription);
  };

  const handleSave = async () => {
    if (!isFormValid()) return;

    let videoSectionData;

    if (isDropdownSelected) {
      // When dropdown option is selected
      videoSectionData = {
        hvoTemplateId: templateId,
        sectionName: selectedCategory,
        sectionNumber: sectionNumber,
        sequence: 1,
        duration: duration,
        audioEmbedded: !!audioFile,
        scroll: scroll,
        audioDescription: audioDescription,
        firstRowValue: null,
        isDynamic: true,
        file: null,
        value: imageURL,
        audio: audioFile,
      };
    } else {
      // When file is uploaded through Choose button
      videoSectionData = {
        hvoTemplateId: templateId,
        sectionName: "IMAGE URL",
        sectionNumber: sectionNumber,
        sequence: 1,
        duration: duration,
        audioEmbedded: !!audioFile,
        scroll: scroll,
        audioDescription: audioDescription,
        firstRowValue: null,
        isDynamic: false,
        file: imageFile,
        value: null,
        audio: audioFile,
      };
    }

    try {
      const response = await createVideoSection(videoSectionData);
      if (response) {
        toast.success("Image section saved successfully!");
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
                  readOnly={isDropdownSelected}
                  value={imageFile?.name || imageURL}
                  onChange={handleImageURLChange}
                  placeholder="Upload image or enter URL"
                  className={`${styles.uploadInput} ${
                    isDropdownSelected ? styles.disabled : ""
                  }`}
                  disabled={isDropdownSelected}
                />
                <button
                  className={`${styles.chooseButton} ${
                    isDropdownSelected ? styles.disabled : ""
                  }`}
                  onClick={() =>
                    !isDropdownSelected && imageInputRef.current?.click()
                  }
                  disabled={isDropdownSelected}
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
                disabled={isDropdownSelected}
              />
            </div>

            <div className={styles.dropdownContainer}>
              <label>Select Image URL</label>
              <CategoryDropdown
                options={categories}
                buttonText="Select Image URL"
                onSelect={handleCategorySelect}
                allowAddNew={false}
                editable={!imageFile}
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
            <button className={styles.nextButton}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
