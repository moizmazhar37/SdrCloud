import React, { useState, useRef, useEffect } from "react";
import styles from "./StaticURL.module.scss";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import AudioDescModal from "src/Common/AudioDescModal/AudioDescModal";
import useCreateVideoSection from "../hooks/useCreateVideoSection";
import useUpdateVideoSection from "../hooks/useUpdateImageVideoSection";
import { toast } from "react-toastify";
import InfoBox from "src/Common/InfoBox/InfoBox";

const StaticURL = ({
  categories = [],
  audioCategories,
  templateId,
  sectionNumber,
  onSaveSuccess,
  onClose,
  editData,
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
  const { createVideoSection, loading: createLoading } =
    useCreateVideoSection();
  const { updateVideoSection, loading: updateLoading } =
    useUpdateVideoSection();

  useEffect(() => {
    if (editData) {
      setUrl(editData.value || "https://www.");
      setDuration(editData.duration || "");
      setSelectedType(editData.scroll ? "Yes" : "No");
      setAudioFile(editData.audio || null);
      setAudioTitle(editData.audio?.name || "");
      setAudioDescription(editData.audioDescription || "");
      setSelectedCategory(editData.sectionName || null);
      setDropdownKey((prev) => prev + 1);
    } else {
      setUrl("https://www.");
      setDuration("");
      setSelectedType("");
      setAudioFile(null);
      setAudioTitle("");
      setAudioDescription("");
      setSelectedCategory(null);
    }
  }, [editData]);

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

  // const handleCategorySelect = (value, label) => {
  //   setUrl(value);
  //   setSelectedCategory(label);
  // };

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
    return (
      url.length > 12 &&
      url !== "https://www." &&
      String(duration).trim() !== ""
    );
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

    if (editData) {
      videoSectionData.id = editData.id;
      try {
        const response = await updateVideoSection(
          editData.id,
          videoSectionData
        );
        if (response) {
          toast.success("Static URL section updated successfully!");
          onSaveSuccess();
          onClose();
        }
      } catch (error) {
        toast.error("Failed to update static URL section");
      }
    } else {
      try {
        const response = await createVideoSection(videoSectionData);
        if (response) {
          toast.success("Static URL section saved successfully.");
          onSaveSuccess();
          onClose();
        }
      } catch (error) {
        toast.error("Failed to save static URL section. Please try again.");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.headerText}>
            {editData
              ? `Edit Static URL | Element ${sectionNumber}`
              : `Static URL | Element ${sectionNumber}`}
          </span>
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

            {/* <div className={styles.urlSelect}>
              <label>Select Static URL</label>
              <CategoryDropdown
                key={dropdownKey}
                options={categories}
                buttonText="Select Static URL"
                onSelect={handleCategorySelect}
                allowAddNew={false}
                initialValue={editData?.value}
              />
            </div> */}
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
                buttonText="Select type"
                onSelect={setSelectedType}
                allowAddNew={false}
                initialValue={editData?.scroll ? "Yes" : "No"}
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
              !isFormValid() || createLoading || updateLoading
                ? styles.disabled
                : ""
            }`}
            onClick={handleSave}
            disabled={!isFormValid() || createLoading || updateLoading}
          >
            {createLoading || updateLoading
              ? "Saving..."
              : editData
              ? "Update"
              : "Save"}
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
