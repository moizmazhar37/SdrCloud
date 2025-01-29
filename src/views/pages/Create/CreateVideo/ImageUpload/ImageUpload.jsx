import React, { useState, useRef, useEffect } from "react";
import styles from "./ImageUpload.module.scss";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import useCreateVideoSection from "../../Hooks/useCreateVideoSection";
import useUpdateVideoSection from "../hooks/useUpdateVideoSection";
import AudioDescModal from "src/Common/AudioDescModal/AudioDescModal";
import {
  initializeEditData,
  resetForm,
  handleImageUpload,
  handleAudioUpload,
  handleSave,
  isFormValid,
} from "./helpers";

const ImageUpload = ({
  categories,
  audioCategories,
  templateId,
  sectionNumber,
  onSaveSuccess,
  onClose,
  editData,
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
  const [currentEditData, setCurrentEditData] = useState(null);

  const { createVideoSection, loading: createLoading } =
    useCreateVideoSection();
  const { updateVideoSection, loading: updateLoading } =
    useUpdateVideoSection();
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  useEffect(() => {
    initializeEditData(editData, {
      setImageURL,
      setImagePreview,
      setSelectedCategory,
      setDuration,
      setScroll,
      setAudioDescription,
      setCurrentEditData,
    });
  }, [editData]);

  useEffect(() => {
    if (!editData && currentEditData) {
      resetForm({
        setImageFile,
        setImageURL,
        setImagePreview,
        setAudioFile,
        setDuration,
        setSelectedCategory,
        setAudioDescription,
        setScroll,
        setCurrentEditData,
        setDropdownKey,
      });
    }
  }, [editData, currentEditData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.backLink}>
            {currentEditData ? "Edit Image" : "Upload Image"} | Element{" "}
            {sectionNumber}
          </span>
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
                  onChange={
                    !imageFile ? (e) => setImageURL(e.target.value) : undefined
                  }
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
                onChange={(e) =>
                  handleImageUpload(e, {
                    setImageFile,
                    setImagePreview,
                    setImageURL,
                    setSelectedCategory,
                    setDropdownKey,
                  })
                }
                className={styles.hiddenInput}
              />
            </div>

            <div className={styles.dropdownContainer}>
              <label>Select Image URL</label>
              <CategoryDropdown
                key={dropdownKey}
                options={categories}
                buttonText="Select Image URL"
                onSelect={(value, label) => {
                  setImageURL(value);
                  setImageFile(null);
                  setImagePreview(value);
                  setSelectedCategory(label);
                }}
                allowAddNew={false}
                initialValue={currentEditData?.value}
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
                onChange={(e) => handleAudioUpload(e, setAudioFile)}
                className={styles.hiddenInput}
              />
              <div className={styles.audioButtons}>
                <button
                  className={styles.uploadButton}
                  onClick={() => audioInputRef.current?.click()}
                >
                  Upload Audio
                </button>
                <button
                  className={`${styles.descriptionButton} ${
                    audioDescription ? styles.active : ""
                  }`}
                  onClick={() => setShowAudioDescModal(true)}
                >
                  Add Audio Description
                </button>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button
              className={`${styles.saveButton} ${
                !isFormValid(imageFile, imageURL, duration) ||
                createLoading ||
                updateLoading
                  ? styles.disabled
                  : ""
              }`}
              disabled={
                !isFormValid(imageFile, imageURL, duration) ||
                createLoading ||
                updateLoading
              }
              onClick={() =>
                handleSave(
                  () => isFormValid(imageFile, imageURL, duration),
                  {
                    templateId,
                    sectionNumber,
                    imageFile,
                    imageURL,
                    selectedCategory,
                    duration,
                    audioFile,
                    scroll,
                    audioDescription,
                  },
                  currentEditData,
                  createVideoSection,
                  updateVideoSection,
                  onSaveSuccess,
                  onClose
                )
              }
            >
              {createLoading || updateLoading
                ? "Saving..."
                : currentEditData
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
          initialValue={audioDescription}
          onSave={(description) => {
            setAudioDescription(description);
            setShowAudioDescModal(false);
          }}
          onClose={() => setShowAudioDescModal(false)}
        />
      )}
    </div>
  );
};

export default ImageUpload;
