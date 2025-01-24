import React, { useState } from "react";
import styles from "./DynamicURL.module.scss";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import AudioDescModal from "src/Common/AudioDescModal/AudioDescModal";
import useCreateVideoSection from "../hooks/useCreateVideoSection";
import { toast } from "react-toastify";

const DynamicURL = ({
  categories = [],
  audioCategories,
  templateId,
  sectionNumber,
  onSaveSuccess,
  onClose,
}) => {
  const [selectedURL, setSelectedURL] = useState(null);
  const [duration, setDuration] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [audioTitle, setAudioTitle] = useState("");
  const [audioDescription, setAudioDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAudioDescModal, setShowAudioDescModal] = useState(false);

  const { createVideoSection } = useCreateVideoSection();

  const handleDurationChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setDuration(value);
  };

  const handleCategorySelect = (value) => {
    setSelectedURL(value);
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setAudioTitle(file.name);
    }
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
    return selectedURL && duration.trim() !== "";
  };

  const handleSave = async () => {
    if (!isFormValid()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    const videoSectionData = {
      hvoTemplateId: templateId,
      sectionName: "Dynamic URL",
      sectionNumber: 2,
      sequence: sectionNumber,
      duration: duration,
      audioEmbedded: !!audioFile,
      scroll: selectedType === "Yes",
      audioDescription: audioDescription,
      firstRowValue: null,
      isDynamic: true,
      value: selectedURL,
      audio: audioFile,
    };

    try {
      const response = await createVideoSection(videoSectionData);
      if (response) {
        toast.success("Dynamic URL section saved successfully!");
        onSaveSuccess();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to save dynamic URL section");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.backArrow}>←</span>
          <span className={styles.headerText}>Dynamic URL | Element</span>
        </div>

        <div className={styles.formContent}>
          <div className={styles.urlRow}>
            <div className={styles.urlSelect}>
              <label>Select Dynamic URL</label>
              <CategoryDropdown
                options={categories}
                buttonText="Select URL"
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
          </div>

          {audioTitle && (
            <div className={styles.audioTitle}>
              <p>Uploaded Audio: {audioTitle}</p>
            </div>
          )}
        </div>
        <div className={styles.audioControls}>
          <div className={styles.audioButtons}>
            <button
              className={styles.uploadBtn}
              onClick={() => document.getElementById("audioUpload").click()}
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
            type="file"
            id="audioUpload"
            accept="audio/*"
            style={{ display: "none" }}
            onChange={handleAudioUpload}
          />
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

export default DynamicURL;
