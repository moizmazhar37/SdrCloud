import React, { useState, useRef, useEffect } from "react";
import styles from "./AudioDescModal.module.scss";

const AudioDescModal = ({
  dynamicFields,
  onSave,
  onClose,
  initialAudioDesc = "",
  initialVoiceModel = null,
  mode = "description", // New prop: "description" or "prompt"
}) => {
  const [audioDesc, setAudioDesc] = useState(initialAudioDesc);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedVoiceModel, setSelectedVoiceModel] = useState(initialVoiceModel);
  const audioRef = useRef(null);
  const [estimatedDuration, setEstimatedDuration] = useState(0);
  const [charLimit, setCharLimit] = useState(1000);
  
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

  const VOICE_RATES = {
    "en-AU-NatashaNeural": 0.068,
    "en-AU-WilliamNeural": 0.070,
    "en-CA-LiamNeural": 0.067,
    "en-GB-SoniaNeural": 0.071,
    "en-US-AriaNeural": 0.066,
  };

  const PAUSE_DELAYS = {
    '.': 0.5,
    ',': 0.2,
    ';': 0.3,
    ':': 0.3,
    '!': 0.4,
    '?': 0.4,
    '\n': 0.3,
    '—': 0.3,
    '-': 0.1,
  };

  const MAX_AUDIO_DURATION_SECONDS = 3600;

  const calculateEstimatedDuration = (text, model) => {
    if (!model || !model.dev_name) return { duration: 0, charLimit: 0 };
    const rate = VOICE_RATES[model.dev_name] || 0.07;
    // Calculate character-based duration
    const chars = text.replace(/\s/g, "").length;
    // Calculate punctuation delay
    const punctuationDelay = text.split("").reduce((acc, char) => {
      return acc + (PAUSE_DELAYS[char] || 0);
    }, 0);
    const duration = parseFloat((chars * rate + punctuationDelay).toFixed(2));
    const maxChars = Math.floor((MAX_AUDIO_DURATION_SECONDS - punctuationDelay) / rate);
    return {
      duration,
      charLimit: maxChars > 0 ? maxChars : 0
    };
  };

  useEffect(() => {
    const { duration, charLimit } = calculateEstimatedDuration(audioDesc, selectedVoiceModel);
    setEstimatedDuration(duration);
    setCharLimit(charLimit);
  }, [audioDesc, selectedVoiceModel]);

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

  // Determine title and placeholder based on mode
  const modalTitle = mode === "prompt" ? "Add Audio Prompt" : "Add Audio Description";
  const placeholderText = mode === "prompt" 
    ? "Enter your audio prompt here..." 
    : "Enter your audio description here...";
    
  // Conditionally show dynamic fields and duration based on mode
  const showDynamicFields = mode === "description";
  const showDurationInfo = mode === "description";

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>{modalTitle}</h2>
        </div>
        <div className={styles.body}>
          <div className={styles.leftSection} style={{ width: mode === "prompt" ? "100%" : "70%" }}>
            <textarea
              className={styles.audioDescInput}
              value={audioDesc}
              maxLength={charLimit}
              onChange={(e) => {
                const newValue = e.target.value;
                setAudioDesc(newValue);
              }}
              placeholder={placeholderText}
            />
            {showDurationInfo && (
              <div className={styles.durationInfo}>
                Estimated Audio Duration: <strong>{estimatedDuration}s</strong>
              </div>
            )}
          </div>
          {showDynamicFields && (
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
          )}
        </div>
        {/* Voice Models Section */}
        <div className={styles.voiceModelsSection}>
          <h3 className={styles.sectionTitle}>Select Voice Model</h3>
          <div className={styles.voiceModelsGrid}>
            {voiceModels.map((model, index) => (
              <button
                key={index}
                className={`${styles.voiceModelButton} ${selectedVoiceModel?.dev_name === model.dev_name
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