import React, { useState, useRef, useEffect } from "react";
import styles from "./AudioDescModal.module.scss";

const AudioDescModal = ({
  dynamicFields,
  onSave,
  onClose,
  initialAudioDesc = "",
  initialVoiceModel = null,
}) => {
  const [audioDesc, setAudioDesc] = useState(initialAudioDesc);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedVoiceModel, setSelectedVoiceModel] =
    useState(initialVoiceModel);
  const audioRef = useRef(null);

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

  // Initialize state with initial values
  useEffect(() => {
    setAudioDesc(initialAudioDesc);
    setSelectedVoiceModel(initialVoiceModel);
  }, [initialAudioDesc, initialVoiceModel]);

  const handleFieldSelect = (field) => {
    setSelectedFields([...selectedFields, `[${field}]`]);
    setAudioDesc(audioDesc + `[${field}]`);
  };

  const handleVoiceModelSelect = (model) => {
    setSelectedVoiceModel(model);

    // Play audio
    if (audioRef.current) {
      audioRef.current.src = model.url;
      audioRef.current.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
    }
  };

  const handleSave = () => {
    onSave({
      audioDesc,
      selectedVoiceModel,
    });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>Add Audio Description</h2>
        </div>

        <div className={styles.body}>
          <div className={styles.leftSection}>
            <textarea
              className={styles.audioDescInput}
              value={audioDesc}
              onChange={(e) => setAudioDesc(e.target.value)}
              placeholder="Enter your audio description here..."
            />
          </div>

          <div className={styles.rightSection}>
            <div className={styles.fieldList}>
              {dynamicFields.map((field, index) => (
                <button
                  key={index}
                  className={styles.fieldButton}
                  onClick={() => handleFieldSelect(field)}
                >
                  {field}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Voice Models Section */}
        <div className={styles.voiceModelsSection}>
          <h3 className={styles.sectionTitle}>Select Voice Model</h3>
          <div className={styles.voiceModelsGrid}>
            {voiceModels.map((model, index) => (
              <button
                key={index}
                className={`${styles.voiceModelButton} ${
                  selectedVoiceModel?.dev_name === model.dev_name
                    ? styles.selected
                    : ""
                }`}
                onClick={() => handleVoiceModelSelect(model)}
              >
                <span className={styles.voiceModelName}>{model.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>

        {/* Hidden audio element for playback */}
        <audio ref={audioRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default AudioDescModal;
