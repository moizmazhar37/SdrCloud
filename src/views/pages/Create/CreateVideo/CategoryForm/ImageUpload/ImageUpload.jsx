import React, { useState, useRef } from "react";
import styles from "./ImageUpload.module.scss";
import CategoryDropdown from "../../CategoryDropdown/CategoryDropdown";

const ImageUpload = ({ categories, onSave }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [duration, setDuration] = useState("");
  const [scrollType, setScrollType] = useState("");

  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleUploadAudio = () => {
    audioInputRef.current?.click();
  };

  const handleAddDescription = () => {
    console.log("Add Audio Description clicked");
  };

  const isFormValid = () => {
    return (imageFile || imagePreview) && duration.trim() !== "";
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
              <label>Upload Image</label>
              <div className={styles.uploadField}>
                <input
                  type="text"
                  readOnly
                  value={imageFile?.name || ""}
                  placeholder="Untitled design.png"
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
                options={categories}
                buttonText="Select Image URL"
                onSelect={() => {}}
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

            <div className={styles.scrollContainer}>
              <label>Scroll</label>
              <CategoryDropdown
                options={[
                  { id: 1, name: "No Scroll" },
                  { id: 2, name: "Scroll Vertical" },
                  { id: 3, name: "Scroll Horizontal" },
                ]}
                buttonText="Select type"
                onSelect={setScrollType}
                allowAddNew={false}
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
                <button className={styles.chooseFileBtn}>
                  Choose File
                  <span className={styles.noFile}>
                    {audioFile ? audioFile.name : "No file chosen"}
                  </span>
                </button>
                <div className={styles.audioActions}>
                  <button
                    className={styles.uploadButton}
                    onClick={handleUploadAudio}
                  >
                    Upload Audio
                  </button>
                  <button
                    className={styles.descriptionButton}
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
                !isFormValid() ? styles.disabled : ""
              }`}
              disabled={!isFormValid()}
            >
              Save
            </button>
            <button className={styles.nextButton}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
