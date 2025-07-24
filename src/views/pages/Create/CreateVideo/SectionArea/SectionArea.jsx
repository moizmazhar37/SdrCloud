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
import ConfirmationModal from "src/Common/ConfirmationModal/ConfirmationModal";

const SectionArea = ({
  initialOptions,
  onSectionTypeChange,
  editable = true,
  templateId = null,
  elementsList = [],
  type = "video",
  onViewSection,
  sheetData = null,
  templateData=null,
}) => {
  const history = useHistory();
  const [sections, setSections] = useState([]);
  const [sectionData, setSectionData] = useState({});
  const { previewVideo, loading: previewLoading } = usePreviewVideo();
  const [audioFile, setAudioFile] = useState(null);
  const [audioFileName, setAudioFileName] = useState("");
  const [showAudioDescModal, setShowAudioDescModal] = useState(false);
  const [audioDescription, setAudioDescription] = useState("");
  const [selectedVoiceModel, setSelectedVoiceModel] = useState(null);
  const { uploadAudio, uploading, error, audioUrl } = useUploadAudio();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // "upload" or "description"


  let audioCategories = getAudioCategories(sheetData);

  const audioInputRef = useRef(null);

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

  const confirmAction = (type) => {
    setPendingAction(type); // store what to do after confirmation
    setShowConfirmModal(true);
  };

  const handleModalConfirm = () => {
    setShowConfirmModal(false);
    if (pendingAction === "upload") {
      handleUploadAudio();
    } else if (pendingAction === "description") {
      handleAddDescription();
    }
    setPendingAction(null);
  };

  const handleModalClose = () => {
    setShowConfirmModal(false);
    setPendingAction(null);
  };

  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadedUrl = await uploadAudio({
      file,
      templateId,
      audioDescription,
    });

    if (uploadedUrl) {
      toast.success("Audio uploaded successfully!");
    } else {
      toast.error(error || "Failed to upload audio. Please try again.");
    }
  };

  const handleAddDescription = () => {
    setShowAudioDescModal(true);
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

    console.log(descriptionData)
    setAudioFileName(descriptionData?.audioDesc);
    setAudioFile(uploadedUrl);

    if (uploadedUrl) {
      toast.success("Audio description uploaded successfully!");
    } else {
      toast.error(error || "Failed to upload audio description.");
    }
  };

    const findVoiceModelByDevName = (devName) => {
    return voiceModels.find((model) => model.dev_name === devName) || null;
  };

  const voiceModel = templateData?.audioAccent
        ? findVoiceModelByDevName(templateData.audioAccent)
        : null;


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
      setAudioDescription(templateData?.audio || "");
      setSelectedVoiceModel(voiceModel || null);
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
                  onClick={() => confirmAction("upload")}
                  disabled={uploading}
                >
                  {uploading ? "Saving Audio..." : "Upload Audio"}
                </button>

                <button
                  className={`${styles.descriptionButton} ${audioDescription ? styles.active : ""}`}
                  onClick={() => confirmAction("description")}
                >
                  Add Audio Description
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
        />
      )}
      <input
        type="file"
        accept="audio/*"
        ref={audioInputRef}
        onChange={handleAudioUpload}
        style={{ display: "none" }}
      />
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleModalClose}
        onAction={handleModalConfirm}
        title="Override Existing Section Audio?"
        confirmationText="Any audio used in sections will be overridden. This audio will be used for the entire video."
        cancelButtonText="Cancel"
        actionButtonText="Proceed"
        showInputField={false}
      />
    </div>


  );
};

export default SectionArea;
