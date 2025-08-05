import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import SectionView from "./SectionView/SectionView";
import usePreviewVideo from "../hooks/usePreviewVideo";
import styles from "./SectionArea.module.scss";
import InfoBox from "src/Common/InfoBox/InfoBox";
import { getAudioCategories } from "../helpers";
import AudioDescModal from "src/Common/AudioDescModal/AudioDescModal";
import useUploadAudio from "./hooks/useUploadAudio";
import { toast } from "react-toastify";

const SectionArea = ({
  initialOptions,
  onSectionTypeChange,
  editable = true,
  templateId = null,
  elementsList = [],
  type = "video",
  onViewSection,
  sheetData = null,
}) => {
  const history = useHistory();
  const [sections, setSections] = useState([]);
  const [sectionData, setSectionData] = useState({});
  const { previewVideo, loading: previewLoading } = usePreviewVideo();
  const [audioFile, setAudioFile] = useState(null);
  const [audioFileName, setAudioFileName] = useState("");
  const [showAudioDescModal, setShowAudioDescModal] = useState(false);
  const [showAudioPromptModal, setShowAudioPromptModal] = useState(false);
  const [audioDescription, setAudioDescription] = useState("");
  const [audioPrompt, setAudioPrompt] = useState("");
  const [selectedVoiceModel, setSelectedVoiceModel] = useState(null);
  const [selectedVoiceModelForPrompt, setSelectedVoiceModelForPrompt] = useState(null);
  const { uploadAudio, uploading, error, audioUrl } = useUploadAudio();

  let audioCategories = getAudioCategories(sheetData);
  const audioInputRef = useRef(null);

  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadedUrl = await uploadAudio({
      file,
      templateId,
      audioDescription: "",
    });
    if (uploadedUrl) {
      toast.success("Audio uploaded successfully!");
      setAudioFile(uploadedUrl);
      setAudioFileName(file.name);
    } else {
      toast.error(error || "Failed to upload audio. Please try again.");
    }
  };

  const handleAddDescription = () => {
    setShowAudioDescModal(true);
  };

  const handleAddPrompt = () => {
    setShowAudioPromptModal(true);
  };

  const handleUploadAudio = () => {
    audioInputRef.current?.click();
  };

  const handleAudioDescriptionSave = async (descriptionData) => {
    setAudioDescription(descriptionData.audioDesc);
    setSelectedVoiceModel(descriptionData.selectedVoiceModel);
    setShowAudioDescModal(false);
    if (!templateId || !descriptionData.audioDesc) {
      toast.error("Missing template or audio description");
      return;
    }
    const uploadedUrl = await uploadAudio({
      file: null,
      templateId,
      audioDescription: descriptionData?.audioDesc,
      voiceModel: descriptionData?.selectedVoiceModel?.dev_name,
    });
    console.log(descriptionData);
    setAudioFileName(descriptionData?.audioDesc);
    setAudioFile(uploadedUrl);
    if (uploadedUrl) {
      toast.success("Audio description uploaded successfully!");
    } else {
      toast.error(error || "Failed to upload audio description.");
    }
  };

  const handleAudioPromptSave = async (promptData) => {
    setAudioPrompt(promptData.audioDesc);
    setSelectedVoiceModelForPrompt(promptData.selectedVoiceModel);
    setShowAudioPromptModal(false);
    if (!templateId || !promptData.audioDesc) {
      toast.error("Missing template or audio prompt");
      return;
    }
    const uploadedUrl = await uploadAudio({
      file: null,
      templateId,
      audioDescription: promptData?.audioDesc,
      voiceModel: promptData?.selectedVoiceModel?.dev_name,
    });
    console.log(promptData);
    setAudioFileName(promptData?.audioDesc);
    setAudioFile(uploadedUrl);
    if (uploadedUrl) {
      toast.success("Audio prompt uploaded successfully!");
    } else {
      toast.error(error || "Failed to upload audio prompt.");
    }
  };

  useEffect(() => {
    if (templateId && elementsList?.length > 0) {
      const sectionMap = elementsList.reduce((acc, element) => {
        acc[element.sequence] = element;
        return acc;
      }, {});
      const sortedSequences = Object.keys(sectionMap)
        .map(Number)
        .sort((a, b) => a - b);
      setSections(sortedSequences);
      setSectionData(sectionMap);
    } else {
      setSections([]);
      setSectionData({});
    }
  }, [templateId, elementsList]);

  const addNewSection = () => {
    setSections((prev) => [...prev, Math.max(...prev, 0) + 1]);
  };

  const handleSelect = (value, sectionNum) => {
    onSectionTypeChange(value, sectionNum);
  };

  const handleViewSection = (sequence, sectionName) => {
    if (onViewSection) {
      onViewSection(sequence, sectionName);
    }
  };

  const renderSection = (sequence) => {
    const currentSectionData = sectionData[sequence];
    if (elementsList?.length > 0 && currentSectionData) {
      return (
        <SectionView
          sectionData={currentSectionData}
          type={type}
          onViewSection={handleViewSection}
        />
      );
    }
    return (
      <div className={styles.sectionContent}>
        <div className={styles.sectionLabel}>Section {sequence}</div>
        <CategoryDropdown
          options={initialOptions}
          buttonText="Choose type"
          onSelect={(value) => handleSelect(value, sequence)}
          allowAddNew={false}
          editable={editable}
        />
      </div>
    );
  };

  const handleProgressOverview = async () => {
    if (type === "hvo") {
      localStorage.setItem("templateId", templateId);
      window.open("/preview-hvo", "_blank");
    } else {
      if (templateId) {
        const response = await previewVideo(templateId);
        if (response) {
          console.log("Preview successful:", response);
        }
      }
    }
  };

  return (
    <div className={styles.sectionAreaContainer}>
      <div className={styles.InfoBoxContainer}>
        <InfoBox
          text={
            "Sections will be available only if sheet is connected and template is created."
          }
        />
      </div>
      <div className={styles.sectionsWrapper}>
        {sections.map((sequence) => (
          <div key={`section-${sequence}`} className={styles.sectionWrapper}>
            <div className={styles.sectionNumber}>{sequence}</div>
            <div className={styles.sectionMain}>{renderSection(sequence)}</div>
          </div>
        ))}
      </div>
      <div className={styles.actions}>
        <button onClick={addNewSection} className={styles.addSectionButton}>
          + Add New Section
        </button>
        {type === "video" && (
          <div className={styles.audioContainer}>
            <div className={styles.audioButtons}>
              <div className={styles.audioActions}>
                <button
                  className={styles.uploadButton}
                  onClick={handleUploadAudio}
                  disabled={uploading}
                >
                  {uploading ? "Saving Audio..." : "Upload Audio"}
                </button>
                <button
                  className={`${styles.descriptionButton} ${audioDescription ? styles.active : ""}`}
                  onClick={handleAddDescription}
                >
                  Add Audio Description
                </button>
                {/* New Audio Prompt Button */}
                <button
                  className={`${styles.descriptionButton} ${audioPrompt ? styles.active : ""}`}
                  onClick={handleAddPrompt}
                >
                  Add Audio Prompt
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={handleProgressOverview}
          className={styles.progressButton}
          disabled={previewLoading}
        >
          {previewLoading
            ? "Loading..."
            : type === "hvo"
              ? "Preview HVO"
              : "Progress Overview"}
        </button>
      </div>
      {showAudioDescModal && (
        <AudioDescModal
          dynamicFields={audioCategories}
          initialAudioDesc={audioDescription}
          initialVoiceModel={selectedVoiceModel}
          onSave={handleAudioDescriptionSave}
          onClose={() => setShowAudioDescModal(false)}
          mode="description" // Specify mode
        />
      )}
      {/* Reuse AudioDescModal for Audio Prompt with mode="prompt" */}
      {showAudioPromptModal && (
        <AudioDescModal
          initialAudioDesc={audioPrompt}
          initialVoiceModel={selectedVoiceModelForPrompt}
          onSave={handleAudioPromptSave}
          onClose={() => setShowAudioPromptModal(false)}
          mode="prompt" // Specify mode
        />
      )}
      <input
        type="file"
        accept="audio/*"
        ref={audioInputRef}
        onChange={handleAudioUpload}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default SectionArea;