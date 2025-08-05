import React, { useState, useEffect } from "react";
import styles from "./DynamicURL.module.scss";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import AudioDescModal from "src/Common/AudioDescModal/AudioDescModal";
import useCreateVideoSection from "../hooks/useCreateVideoSection";
import useUpdateVideoSection from "../hooks/useUpdateImageVideoSection";
import { toast } from "react-toastify";
import InfoBox from "src/Common/InfoBox/InfoBox";
import ConfirmationModal from "src/Common/ConfirmationModal/ConfirmationModal";

const DynamicURL = ({
  categories = [],
  audioCategories,
  templateId,
  sectionNumber,
  onSaveSuccess,
  onClose,
  editData,
  hasLeftSectionAudio = false,
  hasRightSectionAudio = false,
}) => {
  const [selectedURL, setSelectedURL] = useState(editData?.value || "");
  const [duration, setDuration] = useState(editData?.duration || "");
  const [selectedType, setSelectedType] = useState(
    editData?.scroll ? "Yes" : "No"
  );
  const [audioFile, setAudioFile] = useState(editData?.audio || null);
  const [audioTitle, setAudioTitle] = useState(editData?.audio?.name || "");
  const [audioDescription, setAudioDescription] = useState(
    editData?.audio_description || ""
  );
  const [selectedVoiceModel, setSelectedVoiceModel] = useState(
    editData?.audio_accent ? { dev_name: editData.audio_accent } : null
  );
  const [audioPrompt, setAudioPrompt] = useState(editData?.audio_prompt || "");
  const [selectedVoiceModelForPrompt, setSelectedVoiceModelForPrompt] = useState(
    editData?.audio_prompt_accent ? { dev_name: editData.audio_prompt_accent } : null
  );
  const [loading, setLoading] = useState(false);
  const [showAudioDescModal, setShowAudioDescModal] = useState(false);
  const [showAudioPromptModal, setShowAudioPromptModal] = useState(false);
  const [showAudioMismatchModal, setShowAudioMismatchModal] = useState(false);
  const [pendingAudioAction, setPendingAudioAction] = useState(null);
  
  const { createVideoSection } = useCreateVideoSection();
  const { updateVideoSection } = useUpdateVideoSection();

  // Initialize form with edit data if available
  useEffect(() => {
    if (editData) {
      setSelectedURL(editData.value || "");
      setDuration(editData.duration || "");
      setSelectedType(editData.scroll ? "Yes" : "No");
      setAudioFile(editData.audio || null);
      setAudioTitle(editData.audio?.name || "");
      setAudioDescription(editData.audio_description || "");
      if (editData.audio_accent) {
        setSelectedVoiceModel({ dev_name: editData.audio_accent });
      } else {
        setSelectedVoiceModel(null);
      }
      setAudioPrompt(editData.audio_prompt || "");
      if (editData.audio_prompt_accent) {
        setSelectedVoiceModelForPrompt({ dev_name: editData.audio_prompt_accent });
      } else {
        setSelectedVoiceModelForPrompt(null);
      }
    }
  }, [editData]);

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

  // Check if current section has audio
  const hasCurrentSectionAudio = () => {
    return !!(audioFile || (audioDescription && selectedVoiceModel) || (audioPrompt && selectedVoiceModelForPrompt));
  };

  const handleRequestAudioUpload = () => {
    // Check if there's an audio mismatch with adjacent sections
    const currentHasAudio = hasCurrentSectionAudio();
    
    // If we're adding audio and there's a mismatch with adjacent sections
    if (!currentHasAudio && (hasLeftSectionAudio || hasRightSectionAudio)) {
      setPendingAudioAction("upload");
      setShowAudioMismatchModal(true);
      return;
    }
    
    // If we're replacing audio and there's a mismatch with adjacent sections
    if (currentHasAudio && (hasLeftSectionAudio !== currentHasAudio || hasRightSectionAudio !== currentHasAudio)) {
      setPendingAudioAction("upload");
      setShowAudioMismatchModal(true);
      return;
    }
    
    // If no mismatch, proceed directly
    document.getElementById("audioUpload").click();
  };

  const handleRequestDescription = () => {
    // Check if there's an audio mismatch with adjacent sections
    const currentHasAudio = hasCurrentSectionAudio();
    
    // If we're adding audio and there's a mismatch with adjacent sections
    if (!currentHasAudio && (hasLeftSectionAudio || hasRightSectionAudio)) {
      setPendingAudioAction("description");
      setShowAudioMismatchModal(true);
      return;
    }
    
    // If we're replacing audio and there's a mismatch with adjacent sections
    if (currentHasAudio && (hasLeftSectionAudio !== currentHasAudio || hasRightSectionAudio !== currentHasAudio)) {
      setPendingAudioAction("description");
      setShowAudioMismatchModal(true);
      return;
    }
    
    // If no mismatch, proceed directly
    setShowAudioDescModal(true);
  };

  const handleRequestPrompt = () => {
    // Check if there's an audio mismatch with adjacent sections
    const currentHasAudio = hasCurrentSectionAudio();
    
    // If we're adding audio and there's a mismatch with adjacent sections
    if (!currentHasAudio && (hasLeftSectionAudio || hasRightSectionAudio)) {
      setPendingAudioAction("prompt");
      setShowAudioMismatchModal(true);
      return;
    }
    
    // If we're replacing audio and there's a mismatch with adjacent sections
    if (currentHasAudio && (hasLeftSectionAudio !== currentHasAudio || hasRightSectionAudio !== currentHasAudio)) {
      setPendingAudioAction("prompt");
      setShowAudioMismatchModal(true);
      return;
    }
    
    // If no mismatch, proceed directly
    setShowAudioPromptModal(true);
  };

  const handleProceedWithMismatch = () => {
    setShowAudioMismatchModal(false);
    if (pendingAudioAction === "upload") {
      document.getElementById("audioUpload").click();
    } else if (pendingAudioAction === "description") {
      setShowAudioDescModal(true);
    } else if (pendingAudioAction === "prompt") {
      setShowAudioPromptModal(true);
    }
    setPendingAudioAction(null);
  };

  const handleCancelDueToMismatch = () => {
    setShowAudioMismatchModal(false);
    setPendingAudioAction(null);
  };

  const handleAudioDescriptionSave = (descriptionData) => {
    setAudioDescription(descriptionData.audioDesc);
    setSelectedVoiceModel(descriptionData.selectedVoiceModel);
    setShowAudioDescModal(false);
  };

  const handleAudioPromptSave = (promptData) => {
    setAudioPrompt(promptData.audioDesc);
    setSelectedVoiceModelForPrompt(promptData.selectedVoiceModel);
    setShowAudioPromptModal(false);
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
      audioAccent: selectedVoiceModel?.dev_name || null,
      audioPrompt: audioPrompt,
      audioPromptAccent: selectedVoiceModelForPrompt?.dev_name || null,
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
            ? "Dynamic URL section updated successfully."
            : "Dynamic URL section saved successfully."
        );
        onSaveSuccess();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to save dynamic URL section. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              onClick={handleRequestAudioUpload}
            >
              Upload Audio
            </button>
            <button
              className={`${styles.descriptionBtn} ${
                audioDescription ? styles.active : ""
              }`}
              onClick={handleRequestDescription}
            >
              Add Audio Description
            </button>
            <button
              className={`${styles.descriptionBtn} ${
                audioPrompt ? styles.active : ""
              }`}
              onClick={handleRequestPrompt}
            >
              Add Audio Prompt
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
          initialAudioDesc={audioDescription}
          initialVoiceModel={selectedVoiceModel}
          onSave={handleAudioDescriptionSave}
          onClose={() => setShowAudioDescModal(false)}
          mode="description"
        />
      )}
      {showAudioPromptModal && (
        <AudioDescModal
          initialAudioDesc={audioPrompt}
          initialVoiceModel={selectedVoiceModelForPrompt}
          onSave={handleAudioPromptSave}
          onClose={() => setShowAudioPromptModal(false)}
          mode="prompt"
        />
      )}
      {showAudioMismatchModal && (
        <ConfirmationModal
          isOpen={showAudioMismatchModal}
          onClose={handleCancelDueToMismatch}
          onAction={handleProceedWithMismatch}
          title="Audio Configuration Mismatch"
          confirmationText="Adjacent sections have different audio configurations. This may result in inconsistent audio experience. Do you want to proceed?"
          cancelButtonText="Cancel"
          actionButtonText="Proceed Anyway"
          showInputField={false}
        />
      )}
    </div>
  );
};

export default DynamicURL;