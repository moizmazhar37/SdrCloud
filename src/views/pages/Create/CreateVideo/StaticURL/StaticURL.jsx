import React, { useState, useRef, useEffect } from "react";
import styles from "./StaticURL.module.scss";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import AudioDescModal from "src/Common/AudioDescModal/AudioDescModal";
import useCreateVideoSection from "../hooks/useCreateVideoSection";
import useUpdateVideoSection from "../hooks/useUpdateImageVideoSection";
import { toast } from "react-toastify";
import InfoBox from "src/Common/InfoBox/InfoBox";
import ConfirmationModal from "src/Common/ConfirmationModal/ConfirmationModal";

const StaticURL = ({
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
  const [url, setUrl] = useState("https://www.");
  const [duration, setDuration] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioTitle, setAudioTitle] = useState("");
  const [audioDescription, setAudioDescription] = useState("");
  const [selectedVoiceModel, setSelectedVoiceModel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownKey, setDropdownKey] = useState(0);
  const [showAudioDescModal, setShowAudioDescModal] = useState(false);
  const [showAudioPromptModal, setShowAudioPromptModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAudioMismatchModal, setShowAudioMismatchModal] = useState(false);
  const [pendingAudioAction, setPendingAudioAction] = useState(null);
  const [reverseScroll, setReverseScroll] = useState(false);

  const iframeRef = useRef(null);
  const audioInputRef = useRef(null);
  const { createVideoSection, loading: createLoading } = useCreateVideoSection();
  const { updateVideoSection, loading: updateLoading } = useUpdateVideoSection();
    
  const voiceModels = [
    {
      name: "Natasha",
      dev_name: "en-AU-NatashaNeural",
      url: "https://storage.googleapis.com/static-data-for-sdrc/uploads/e0653e5d-a70a-41e0-9706-4764f27ae886/en-AU-NatashaNeural_20250522071439.mp3",
    },
    {
      name: "William",
      dev_name: "en-AU-WilliamNeural",
      url: "https://storage.googleapis.com/static-data-for-sdrc/uploads/e0653e5d-a70a-41e0-9706-4764f27ae886/en-AU-WilliamNeural_20250522071508.mp3",
    },
    {
      name: "Liam",
      dev_name: "en-CA-LiamNeural",
      url: "https://storage.googleapis.com/static-data-for-sdrc/uploads/e0653e5d-a70a-41e0-9706-4764f27ae886/en-CA-LiamNeural_20250522071530.mp3",
    },
    {
      name: "Sonia",
      dev_name: "en-GB-SoniaNeural",
      url: "https://storage.googleapis.com/static-data-for-sdrc/uploads/e0653e5d-a70a-41e0-9706-4764f27ae886/en-GB-SoniaNeural_20250522071548.mp3",
    },
    {
      name: "Aria",
      dev_name: "en-US-AriaNeural",
      url: "https://storage.googleapis.com/static-data-for-sdrc/uploads/e0653e5d-a70a-41e0-9706-4764f27ae886/en-US-AriaNeural_20250522071610.mp3",
    },
  ];
  
  const findVoiceModelByDevName = (devName) => {
    return voiceModels.find((model) => model.dev_name === devName) || null;
  };

  useEffect(() => {
    if (editData) {
      setUrl(editData.value || "https://www.");
      setDuration(editData.duration || "");
      setSelectedType(editData.scroll ? "Yes" : "No");
      setReverseScroll(editData.reverse_scroll || false);
      setAudioFile(editData.audio || null);
      setAudioTitle(editData.audio?.name || "");
      setAudioDescription(editData.audio_description || "");
      const voiceModel = editData.audio_accent
        ? findVoiceModelByDevName(editData.audio_accent)
        : null;
      setSelectedVoiceModel(voiceModel);
      setSelectedCategory(editData.sectionName || null);
      setDropdownKey((prev) => prev + 1);
    } else {
      setUrl("https://www.");
      setDuration("");
      setSelectedType("");
      setReverseScroll(false);
      setAudioFile(null);
      setAudioTitle("");
      setAudioDescription("");
      setSelectedVoiceModel(null);
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

  // Check if current section has audio
  const hasCurrentSectionAudio = () => {
    return !!(audioFile || (audioDescription && selectedVoiceModel));
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
    
    // If no mismatch, proceed with confirmation modal
    setPendingAudioAction("upload");
    setShowConfirmModal(true);
  };

  const handleRequestAudioDescription = () => {
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
    
    // If no mismatch, proceed with confirmation modal
    setPendingAudioAction("description");
    setShowConfirmModal(true);
  };

  const handleRequestAudioPrompt = () => {
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

  const handleConfirmAudioAction = () => {
    setShowConfirmModal(false);
    if (pendingAudioAction === "upload") {
      document.getElementById("audioUpload").click();
    } else if (pendingAudioAction === "description") {
      setShowAudioDescModal(true);
    }
    setPendingAudioAction(null);
  };

  const handleCancelAudioAction = () => {
    setShowConfirmModal(false);
    setPendingAudioAction(null);
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
    setShowAudioPromptModal(false);
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
      reverse_scroll: selectedType === "Yes" ? reverseScroll : false,
      audioDescription: audioDescription,
      audioAccent: selectedVoiceModel?.dev_name || null,
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
            {selectedType === "Yes" && (
              <div className={styles.reverseScrollToggle}>
                <label>
                  <input
                    type="checkbox"
                    checked={reverseScroll}
                    onChange={(e) => setReverseScroll(e.target.checked)}
                  />
                  Reverse Scroll
                </label>
              </div>
            )}
            <div className={styles.audioControls}>
              <div className={styles.audioButtons}>
                <button
                  className={styles.uploadBtn}
                  onClick={handleRequestAudioUpload}
                >
                  Upload Audio
                </button>
                <button
                  className={`${styles.descriptionBtn} ${audioDescription ? styles.active : ""}`}
                  onClick={handleRequestAudioDescription}
                >
                  Add Audio Description
                </button>
                <button
                  className={`${styles.descriptionBtn} ${showAudioPromptModal ? styles.active : ""}`}
                  onClick={handleRequestAudioPrompt}
                >
                  Add Audio Prompt
                </button>
              </div>
              <input
                ref={audioInputRef}
                type="file"
                id="audioUpload"
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
          {selectedVoiceModel && (
            <div className={styles.selectedVoiceModel}>
              <p>Selected Voice: {selectedVoiceModel.name}</p>
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
            className={`${styles.saveBtn} ${!isFormValid() || createLoading || updateLoading
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
          initialAudioDesc={audioDescription}
          initialVoiceModel={selectedVoiceModel}
          onSave={handleAudioDescriptionSave}
          onClose={() => setShowAudioDescModal(false)}
        />
      )}
      {showAudioPromptModal && (
        <AudioDescModal
          initialAudioDesc=""
          initialVoiceModel={null}
          onSave={handleAudioPromptSave}
          onClose={() => setShowAudioPromptModal(false)}
          mode="prompt"
        />
      )}
      {showConfirmModal && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={handleCancelAudioAction}
          onAction={handleConfirmAudioAction}
          title="Override Existing Section Audio?"
          confirmationText="Replacing audio will override the existing section audio and apply to the entire video."
          cancelButtonText="Cancel"
          actionButtonText="Proceed"
          showInputField={false}
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

export default StaticURL;