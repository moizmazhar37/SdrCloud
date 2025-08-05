import React, { useState, useRef, useEffect } from "react";
import styles from "./ImageUpload.module.scss";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import AudioDescModal from "src/Common/AudioDescModal/AudioDescModal";
import useCreateVideoSection from "../hooks/useCreateVideoSection";
import useUpdateVideoSection from "../hooks/useUpdateImageVideoSection";
import { toast } from "react-toastify";
import InfoBox from "src/Common/InfoBox/InfoBox";

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
  const [selectedVoiceModel, setSelectedVoiceModel] = useState(null);
  // New state for audio prompt
  const [audioPrompt, setAudioPrompt] = useState(editData?.audio_prompt || "");
  const [selectedVoiceModelForPrompt, setSelectedVoiceModelForPrompt] = useState(
    editData?.audio_prompt_accent ? { dev_name: editData.audio_prompt_accent } : null
  );
  const [audioFileName, setAudioFileName] = useState("");
  const [scroll, setScroll] = useState(null);
  const [dropdownKey, setDropdownKey] = useState(0);
  const [showAudioDescModal, setShowAudioDescModal] = useState(false);
  const [showAudioPromptModal, setShowAudioPromptModal] = useState(false);
  const [currentEditData, setCurrentEditData] = useState(null);
  const { createVideoSection, loading: createLoading } =
    useCreateVideoSection();
  const { updateVideoSection, loading: updateLoading } =
    useUpdateVideoSection();
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  // Voice models array - moved to component level so it can be used in useEffect
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

  // Helper function to find voice model by dev_name
  const findVoiceModelByDevName = (devName) => {
    return voiceModels.find((model) => model.dev_name === devName) || null;
  };

  // Initialize form with edit data if available
  useEffect(() => {
    if (editData) {
      if (editData.value) {
        setImageURL(editData.value);
        setImagePreview(editData.value);
        setSelectedCategory(editData.section_name);
      } else {
        setImagePreview(editData.previewContent);
      }
      setDuration(editData.duration || "");
      setScroll(editData.scroll || false);
      setAudioDescription(editData.audio_description || "");
      // Convert audio_accent string to voice model object
      const voiceModel = editData.audio_accent
        ? findVoiceModelByDevName(editData.audio_accent)
        : null;
      setSelectedVoiceModel(voiceModel);
      // Initialize audio prompt data
      setAudioPrompt(editData.audio_prompt || "");
      const voiceModelForPrompt = editData.audio_prompt_accent
        ? findVoiceModelByDevName(editData.audio_prompt_accent)
        : null;
      setSelectedVoiceModelForPrompt(voiceModelForPrompt);
      setCurrentEditData(editData);
    } else {
      setImageFile(null);
      setImageURL("");
      setImagePreview("");
      setAudioFile(null);
      setDuration("");
      setSelectedCategory(null);
      setAudioDescription("");
      setSelectedVoiceModel(null);
      setScroll(null);
      setAudioPrompt("");
      setSelectedVoiceModelForPrompt(null);
      setCurrentEditData(null);
    }
  }, [editData]);

  useEffect(() => {
    if (!editData && currentEditData) {
      setCurrentEditData(null);
      setImageFile(null);
      setImageURL("");
      setImagePreview("");
      setAudioFile(null);
      setDuration("");
      setSelectedCategory(null);
      setAudioDescription("");
      setSelectedVoiceModel(null);
      setScroll(null);
      setAudioPrompt("");
      setSelectedVoiceModelForPrompt(null);
      setDropdownKey((prev) => prev + 1);
    }
  }, [editData, currentEditData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageURL("");
      setImagePreview(URL.createObjectURL(file));
      setSelectedCategory(null);
      setDropdownKey((prev) => prev + 1);
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setAudioFileName(file.name);
    }
  };

  const handleCategorySelect = (value, label) => {
    setImageURL(value);
    setImageFile(null);
    setImagePreview(value);
    setSelectedCategory(label);
  };

  const handleImageURLChange = (e) => {
    const url = e.target.value;
    setImageURL(url);
    setImageFile(null);
    setImagePreview(url);
    setSelectedCategory(null);
    setDropdownKey((prev) => prev + 1);
  };

  const handleUploadAudio = () => {
    audioInputRef.current?.click();
  };

  const handleAddDescription = () => {
    setShowAudioDescModal(true);
  };

  const handleAddPrompt = () => {
    setShowAudioPromptModal(true);
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

  const handleSave = async () => {
    if (!isFormValid()) return;
    const videoSectionData = {
      hvoTemplateId: templateId,
      sectionName: selectedCategory || "IMAGE URL",
      sectionNumber: 3,
      sequence: sectionNumber,
      duration: duration,
      audioEmbedded: !!audioFile,
      scroll: scroll,
      audioDescription: audioDescription,
      audioAccent: selectedVoiceModel?.dev_name || null,
      audioPrompt: audioPrompt, // Add audio prompt
      audioPromptAccent: selectedVoiceModelForPrompt?.dev_name || null, // Add audio prompt accent
      firstRowValue: null,
      isDynamic: !!selectedCategory, // True if category selected, false if URL or file
      file: imageFile,
      value: selectedCategory ? imageURL : null, // URL for dynamic categories
      link: imageURL && !selectedCategory ? imageURL : null, // Only URL if no category is selected
      audio: audioFile,
    };
    if (currentEditData) {
      videoSectionData.id = currentEditData.id;
    }
    try {
      let response;
      if (currentEditData) {
        response = await updateVideoSection(
          currentEditData.id,
          videoSectionData
        );
      } else {
        response = await createVideoSection(videoSectionData);
      }
      if (response) {
        onSaveSuccess();
        toast.success(
          `Image section ${currentEditData ? "updated" : "saved"} successfully`
        );
        onClose();
      }
    } catch (error) {
      toast.error(
        `Failed to ${currentEditData ? "update" : "save"} image section`
      );
    }
  };

  const isFormValid = () => {
    return (
      (imageFile || imageURL.trim() !== "") && String(duration).trim() !== ""
    );
  };

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
                  onChange={!imageFile ? handleImageURLChange : undefined}
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
                onChange={handleImageUpload}
                className={styles.hiddenInput}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <label>Select Image URL</label>
              <CategoryDropdown
                key={dropdownKey}
                options={categories}
                buttonText="Select Image URL"
                onSelect={(value, label) => handleCategorySelect(value, label)}
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
                  {/* New button for Audio Prompt */}
                  <button
                    className={`${styles.descriptionButton} ${
                      audioPrompt ? styles.active : ""
                    }`}
                    onClick={handleAddPrompt}
                  >
                    Add Audio Prompt
                  </button>
                </div>
              </div>
            </div>
          </div>
          {audioFileName && (
            <div className={styles.audioFileName}>
              <span>{audioFileName}</span>
            </div>
          )}
          <div className={styles.actionButtons}>
            <button
              className={`${styles.saveButton} ${
                !isFormValid() || createLoading || updateLoading
                  ? styles.disabled
                  : ""
              }`}
              disabled={!isFormValid() || createLoading || updateLoading}
              onClick={handleSave}
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
      <div className={styles.audioModal}></div>
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
    </div>
  );
};

export default ImageUpload;
