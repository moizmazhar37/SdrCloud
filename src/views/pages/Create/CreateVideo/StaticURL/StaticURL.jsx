import React, { useState, useRef, useEffect } from "react";
import styles from "./StaticURL.module.scss";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import AudioDescModal from "src/Common/AudioDescModal/AudioDescModal";
import useCreateVideoSection from "../../Hooks/useCreateVideoSection";
import { toast } from "react-toastify";

const StaticURL = ({
  categories = [],
  audioCategories,
  templateId,
  sectionNumber,
  onSaveSuccess,
  onClose,
}) => {
  const [url, setUrl] = useState("https://www.");
  const [duration, setDuration] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioTitle, setAudioTitle] = useState("");
  const [audioDescription, setAudioDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownKey, setDropdownKey] = useState(0);
  const [showAudioDescModal, setShowAudioDescModal] = useState(false);

  const iframeRef = useRef(null);
  const audioInputRef = useRef(null);
  const { createVideoSection, loading } = useCreateVideoSection();

  useEffect(() => {
    if (url.length > 12 && url !== "https://www.") {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  }, [url]);

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setSelectedCategory(null);
    setDropdownKey((prev) => prev + 1);
  };

  const handleDurationChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setDuration(value);
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setAudioTitle(file.name);
    }
  };

  const handleCategorySelect = (value, label) => {
    setUrl(value);
    setSelectedCategory(label);
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

  const scrollTypes = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const isFormValid = () => {
    return url.length > 12 && url !== "https://www." && duration.trim() !== "";
  };

  const handleSave = async () => {
    if (!isFormValid()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const videoSectionData = {
      hvoTemplateId: templateId,
      sectionName: "Static URL",
      sectionNumber: 1,
      sequence: sectionNumber,
      duration: duration,
      audioEmbedded: !!audioFile,
      scroll: selectedType === "Yes",
      audioDescription: audioDescription,
      firstRowValue: null,
      isDynamic: !!selectedCategory,
      value: url,
      audio: audioFile,
    };

    try {
      const response = await createVideoSection(videoSectionData);
      if (response) {
        toast.success("Static URL section saved successfully!");
        onSaveSuccess();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to save static URL section");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.headerText}>Static URL | Element 1</span>
        </div>

        <div className={styles.formContent}>
          <div className={styles.urlRow}>
            <div className={styles.urlInput}>
              <label>Enter Static URL</label>
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                spellCheck="false"
                placeholder="https://www."
              />
            </div>

            <div className={styles.urlSelect}>
              <label>Select Static URL</label>
              <CategoryDropdown
                key={dropdownKey}
                options={categories}
                buttonText="Select Static URL"
                onSelect={handleCategorySelect}
                allowAddNew={false}
              />
            </div>
          </div>

          <div className={styles.controlRow}>
            <div className={styles.durationInput}>
              <label>Duration (sec)</label>
              <input
                type="text"
                value={duration}
                onChange={handleDurationChange}
                placeholder="00"
              />
            </div>

            <div className={styles.scrollSelect}>
              <label>Scroll</label>
              <CategoryDropdown
                options={scrollTypes}
                buttonText="Select type"
                onSelect={setSelectedType}
                allowAddNew={false}
              />
            </div>

            <div className={styles.audioControls}>
              <div className={styles.audioButtons}>
                <button
                  className={styles.uploadBtn}
                  onClick={handleUploadAudio}
                >
                  Upload Audio
                </button>
                <button
                  className={`${styles.descriptionBtn} ${
                    audioDescription ? styles.active : ""
                  }`}
                  onClick={handleAddDescription}
                >
                  Add Audio Description
                </button>
              </div>
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                style={{ display: "none" }}
                onChange={handleAudioUpload}
              />
            </div>
          </div>

          {audioTitle && (
            <div className={styles.audioTitle}>
              <p>Uploaded Audio: {audioTitle}</p>
            </div>
          )}

          {showPreview && (
            <div className={styles.previewSection}>
              <iframe
                ref={iframeRef}
                src={url}
                title="Website Preview"
                className={styles.previewFrame}
              />
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button
            className={`${styles.saveBtn} ${
              !isFormValid() || loading ? styles.disabled : ""
            }`}
            onClick={handleSave}
            disabled={!isFormValid() || loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
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

export default StaticURL;
