import React, { useState, useEffect } from "react";
import styles from "./DynamicURL.module.scss";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import AudioDescModal from "src/Common/AudioDescModal/AudioDescModal";
import useCreateVideoSection from "../hooks/useCreateVideoSection";
import useUpdateVideoSection from "../hooks/useUpdateVideoSection";
import { toast } from "react-toastify";
import InfoBox from "src/Common/InfoBox/InfoBox";

const DynamicURL = ({
  categories = [],
  audioCategories,
  templateId,
  sectionNumber,
  onSaveSuccess,
  onClose,
  editData,
}) => {
  const [selectedURL, setSelectedURL] = useState(editData?.value || "");
  const [duration, setDuration] = useState(editData?.duration || "");
  const [selectedType, setSelectedType] = useState(
    editData?.scroll ? "Yes" : "No"
  );
  const [audioFile, setAudioFile] = useState(editData?.audio || null);
  const [audioTitle, setAudioTitle] = useState(editData?.audio?.name || "");
  const [audioDescription, setAudioDescription] = useState(
    editData?.audioDescription || ""
  );
  const [loading, setLoading] = useState(false);
  const [showAudioDescModal, setShowAudioDescModal] = useState(false);

  const { createVideoSection } = useCreateVideoSection();
  const { updateVideoSection } = useUpdateVideoSection();

  // Initialize form with edit data if available
  useEffect(() => {
    if (editData?.value) {
      console.log("Setting edit data:", editData.value);
      setSelectedURL(editData.value);
      setDuration(editData.duration || "");
      setSelectedType(editData.scroll ? "Yes" : "No");
      setAudioFile(editData.audio || null);
      setAudioTitle(editData.audio?.name || "");
      setAudioDescription(editData.audioDescription || "");
    }
  }, [editData]);

  const handleDurationChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setDuration(value);
  };

  const handleCategorySelect = (value) => {
    console.log("Category selected:", value);
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
    return selectedURL && String(duration).trim() !== "";
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
      let response;
      if (editData) {
        videoSectionData.id = editData.id;
        response = await updateVideoSection(editData.id, videoSectionData);
      } else {
        response = await createVideoSection(videoSectionData);
      }

      if (response) {
        toast.success(
          editData
            ? "Dynamic URL section updated successfully!"
            : "Dynamic URL section saved successfully!"
        );
        onSaveSuccess();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to save dynamic URL section");
    } finally {
      setLoading(false);
    }
  };

  // Find the matching option object for the selected URL
  const selectedOption = categories.find(
    (option) => option.value === selectedURL
  );
  const buttonText = selectedOption ? selectedOption.label : "Select URL";

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.backArrow}>←</span>
          <span className={styles.headerText}>
            {editData
              ? `Edit Dynamic URL | Element ${sectionNumber}`
              : `Dynamic URL | Element ${sectionNumber}`}
          </span>
        </div>

        <div className={styles.formContent}>
          <div className={styles.urlRow}>
            <div className={styles.urlSelect}>
              <label>Select Dynamic URL</label>
              <CategoryDropdown
                options={categories}
                buttonText={buttonText}
                onSelect={handleCategorySelect}
                allowAddNew={false}
                initialValue={selectedURL}
                selectedValue={selectedURL}
              />
            </div>
          </div>

          <div className={styles.controlRow}>
            <div className={styles.durationInput}>
              <label>
                Duration (sec){" "}
                <InfoBox
                  text={
                    "Enter the duration of this section video to be generated"
                  }
                />
              </label>
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
                buttonText={selectedType || "Select type"}
                onSelect={setSelectedType}
                allowAddNew={false}
                initialValue={selectedType}
                selectedValue={selectedType}
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
            {loading ? "Saving..." : editData ? "Update" : "Save"}
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
