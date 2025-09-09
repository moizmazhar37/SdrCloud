// HighlightBanner2.jsx
import React, { useState, useEffect } from "react";
import CategoryDropdown from "../../../CreateVideo/CategoryDropdown/CategoryDropdown";
import ColorInput from "src/Common/ColorInput/ColorInput";
import CopyText from "src/Common/CopyText/CopyText";
import InputField from "src/Common/InputField/InputField";
import { ArrowLeft } from "lucide-react";
import styles from "./HighlightBanner2.module.scss";
import useSaveHighlightBanner2 from "../../Hooks/HighlightBanner2/useSaveHighlightBanner2";
import useUpdateHighlightBanner2 from "../../Hooks/HighlightBanner2/useUpdateHighlightBanner2";

const HighlightBanner2 = ({
  dynamicFields = [],
  dynamicURL = [],
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
  const [ctaButtonText, setCtaButtonText] = useState("");
  const [ctaButtonColor, setCtaButtonColor] = useState("");
  const [ctaButtonTextColor, setCtaButtonTextColor] = useState("");
  const [staticUrl, setStaticUrl] = useState("");
  const [dynamicUrl, setDynamicUrl] = useState("");
  console.log("staticurlllll", staticUrl);

  const { saveHighlightBanner2, loading: saveLoading } =
    useSaveHighlightBanner2();
  const { updateHighlightBanner2, loading: updateLoading } =
    useUpdateHighlightBanner2();
    

  const normalizeUrl = (url) => {
    let input = url.trim();
    // If input already starts with http:// or https://, return as is
    console.log("input", input);
    if (/^https?:\/\//i.test(input)) {
      console.log(" normailized input", input);
      return input;
    }
    // Otherwise, prepend https://
    
    return 'https://' + input;
  };

  useEffect(() => {
    if (initialData) {
      setBannerText(initialData.banner_text || "");
      setBannerColor(initialData.banner_color || "");
      setTextColor(initialData.banner_text_color || "");
      setSize(initialData.banner2_text_size?.toString() || "00");
      setCtaButtonText(initialData.cta_button_text || "");
      setCtaButtonColor(initialData.cta_button_color || "");
      setCtaButtonTextColor(initialData.banner_button_text_color || "");
      setStaticUrl(initialData.static_url || "");
      setDynamicUrl(initialData.dynamic_url || "");
    }
  }, [initialData]);
  console.log("", "highlight 2 data==", initialData);
  const handleSave = async () => {
    try {
      const urlToSave = staticUrl || dynamicUrl;

      if (initialData) {
        console.log('initialData', staticUrl);
        await updateHighlightBanner2(
          {
            ctaButtonText,
            bannerText,
            staticUrl: urlToSave,
            ctaButtonColor,
            bannerColor,
            bannerTextColor: textColor,
            bannerButtonTextColor: ctaButtonTextColor,
            bannerTextSize: parseInt(size) || 0,
          },
          initialData.id
        );
      } else {
        await saveHighlightBanner2({
          hvoTemplateId: templateId,
          sequence,
          ctaButtonText,
          bannerText,
          staticUrl: urlToSave,
          ctaButtonColor,
          bannerColor,
          bannerTextColor: textColor,
          bannerButtonTextColor: ctaButtonTextColor,
          bannerTextSize: parseInt(size) || 0,
        });
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

  const handleClose = () => {
    onClose();
  };

  const handleSizeChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value === "" || parseInt(value) <= 32) {
      setSize(value);
    }
  };

  const loading = initialData ? updateLoading : saveLoading;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onClose}>
          <ArrowLeft size={16} />
          Highlight Banner 2 | Section {sequence}
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.mainSection}>
          <div className={styles.topControls}>
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
                  placeholder="00"
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

          <div className={styles.inputGroup}>
            <label>CTA Button Text</label>
            <InputField
              value={ctaButtonText}
              onChange={(e) => setCtaButtonText(e.target.value)}
              placeholder="Enter Button Text"
            />
          </div>

          <div className={styles.colorControls}>
            <div className={styles.inputGroup}>
              <label>Choose CTA Button Color</label>
              <ColorInput value={ctaButtonColor} onChange={setCtaButtonColor} />
            </div>

            <div className={styles.inputGroup}>
              <label>Choose CTA Button Text Color</label>
              <ColorInput
                value={ctaButtonTextColor}
                onChange={setCtaButtonTextColor}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>If Static Enter Static URL Here</label>
            <InputField
              placeholder="Enter Link URL"
              value={normalizeUrl(staticUrl)}
              onChange={(e) => {
                    // setStaticUrl(e.target.value);
                    setDynamicUrl("");
                    const normalized = normalizeUrl(e.target.value);
                                        setStaticUrl(normalized);

                  }}
                  onBlur={(e) => {
                    const normalized = normalizeUrl(e.target.value);
                    console.log("Normalized URL:", normalized);
                    setStaticUrl(normalized);
                  }}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>If Dynamic URL Select Here</label>
            <CategoryDropdown
              key={dynamicUrl}
              options={dynamicURL.map((field) => ({
                label: field,
                value: field,
              }))}
              buttonText="Select Dynamic URL"
              onSelect={(value) => {
                setDynamicUrl(`[${value}]`);
                setStaticUrl("");
              }}
              allowAddNew={false}
              initialValue={dynamicUrl}
            />
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

export default HighlightBanner2;
