import React, { useState, useRef, useEffect } from "react";
import styles from "./StaticURL.module.scss";
import CategoryDropdown from "../../CategoryDropdown/CategoryDropdown";

const StaticURL = ({ categories = [] }) => {
  const [url, setUrl] = useState("https://www.");
  const [duration, setDuration] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const iframeRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (url.length > 12 && url !== "https://www.") {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  }, [url]);

  const handleUrlChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("https://www.")) {
      value = "https://www." + value.replace(/https:\/\/www\./, "");
    }
    setUrl(value);
  };

  const handleDurationChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setDuration(value);
  };

  const scrollTypes = ["Vertical", "Horizontal", "Both"];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.backArrow}>←</span>
          <span className={styles.headerText}>Static URL | Element 1</span>
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
              />
            </div>

            <div className={styles.urlSelect}>
              <label>Select Static URL</label>
              <CategoryDropdown
                options={categories}
                buttonText="Select Image URL"
                onSelect={(value) => setUrl(value)}
                allowAddNew={false}
              />
            </div>
          </div>

          <div className={styles.controlRow}>
            <div className={styles.durationInput}>
              <label>Duration (sec)</label>
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
              />
            </div>

            <div className={styles.audioControls}>
              <div className={styles.audioButtons}>
                <button className={styles.uploadBtn}>Upload Audio</button>
                <button className={styles.descriptionBtn}>
                  Add Audio Description
                </button>
              </div>
            </div>
          </div>

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
          <button className={styles.saveBtn}>Save</button>
          <button className={styles.nextBtn}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default StaticURL;
