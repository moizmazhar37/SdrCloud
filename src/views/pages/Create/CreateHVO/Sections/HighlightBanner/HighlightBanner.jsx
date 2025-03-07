// HighlightBanner.jsx
import React, { useState, useEffect } from "react";
import CategoryDropdown from "../../../CreateVideo/CategoryDropdown/CategoryDropdown";
import ColorInput from "src/Common/ColorInput/ColorInput";
import CopyText from "src/Common/CopyText/CopyText";
import InputField from "src/Common/InputField/InputField";
import { ArrowLeft } from "lucide-react";
import styles from "./HighlightBanner.module.scss";
import useSaveHighlightBanner from "../../Hooks/HighlightBanner/useSaveHighlightBanner";
import useUpdateHighlightBanner from "../../Hooks/HighlightBanner/useUpdateHighlightBanner";

const HighlightBanner = ({
  dynamicFields = [],
  onSectionSave,
  onClose,
  templateId,
  sequence,
  initialData,
}) => {
  const [bannerText, setBannerText] = useState("");
  const [bannerColor, setBannerColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [size, setSize] = useState("00");
  const [selectedScroll, setSelectedScroll] = useState(null);
  const [dropdownKey, setDropdownKey] = useState(0);

  const { saveHighlightBanner, loading: saveLoading } =
    useSaveHighlightBanner();
  const { updateHighlightBanner, loading: updateLoading } =
    useUpdateHighlightBanner();

  const scrollOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setBannerText(initialData.banner_text || "");
      setBannerColor(initialData.banner_color || "");
      setTextColor(initialData.banner_text_color || "");
      setSize(initialData.banner_text_size?.toString() || "00");
      setSelectedScroll(initialData.scroll ? "yes" : "no");
      // Force dropdown to re-render with initial value
      setDropdownKey((prev) => prev + 1);
    }
  }, [initialData]);

  const handleSave = async () => {
    try {
      const data = {
        templateId,
        sequence,
        bannerText,
        bannerColor,
        bannerTextColor: textColor,
        bannerTextSize: size,
        scroll: selectedScroll,
      };

      if (initialData) {
        await updateHighlightBanner(data, initialData.id);
      } else {
        await saveHighlightBanner(data);
      }

      if (onSectionSave) {
        onSectionSave();
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to save/update banner:", error);
    }
  };

  const handleSizeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "" || Number(value) <= 32) {
      setSize(value);
    }
  };

  const loading = initialData ? updateLoading : saveLoading;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onClose}>
          <ArrowLeft size={16} />
          Banner | Section {sequence}
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.mainSection}>
          <div className={styles.topControls}>
            <div className={styles.inputGroup}>
              <label>Horizontal Scroll</label>
              <CategoryDropdown
                key={dropdownKey}
                options={scrollOptions}
                buttonText="Select Scroll"
                onSelect={(value) => setSelectedScroll(value)}
                allowAddNew={false}
                initialValue={selectedScroll}
              />
            </div>

            <div className={styles.banner}>
              <label>Banner Text</label>
              <InputField
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                placeholder="Enter Your Banner Text Here"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>
                Size <span className={styles.sizeHint}>(Max 32 px.)</span>
              </label>
              <div className={styles.sizeWrapper}>
                <InputField
                  value={size}
                  onChange={handleSizeChange}
                  className={styles.sizeInput}
                />
              </div>
            </div>
          </div>

          <div className={styles.colorControls}>
            <div className={styles.inputGroup}>
              <label>Choose Banner Color</label>
              <ColorInput value={bannerColor} onChange={setBannerColor} />
            </div>

            <div className={styles.inputGroup}>
              <label>Choose Banner Text Color</label>
              <ColorInput value={textColor} onChange={setTextColor} />
            </div>
          </div>
        </div>

        <div className={styles.copySection}>
          <CopyText fields={dynamicFields} />
        </div>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.saveButton}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : initialData ? "Update" : "Save"}
        </button>

        <button
          onClick={handleClose}
          className={styles.cancelButton}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default HighlightBanner;
