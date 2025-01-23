import React, { useState } from "react";
import styles from "./AudioDescModal.module.scss";

const AudioDescModal = ({ dynamicFields, onSave, onClose }) => {
  const [audioDesc, setAudioDesc] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);

  const handleFieldSelect = (field) => {
    setSelectedFields([...selectedFields, `[${field}]`]);
    setAudioDesc(audioDesc + `[${field}]`);
  };

  const handleSave = () => {
    onSave(audioDesc);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>Add Audio Description</h2>
        </div>
        <div className={styles.body}>
          <textarea
            className={styles.audioDescInput}
            value={audioDesc}
            onChange={(e) => setAudioDesc(e.target.value)}
          />
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
        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioDescModal;
