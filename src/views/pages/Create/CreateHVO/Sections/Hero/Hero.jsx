import React, { useState, useEffect, useRef, useCallback } from "react";
import CategoryDropdown from "../../../CreateVideo/CategoryDropdown/CategoryDropdown";
import ColorInput from "src/Common/ColorInput/ColorInput";
import CopyText from "src/Common/CopyText/CopyText";
import InputField from "src/Common/InputField/InputField";
import { ArrowLeft } from "lucide-react";
import styles from "./Hero.module.scss";
import useSaveHeroSection from "../../Hooks/Hero/useSaveHero";

const HeroSection = ({
  dynamicFields = [],
  dynamicURL = [],
  dynamicImage = [],
  templateId,
  sequence,
  onSectionSave,
  onClose,
  initialData,
}) => {
  const [heroImg, setHeroImg] = useState("");
  const [heroImgPreview, setHeroImgPreview] = useState("");
  const [file, setFile] = useState(null);
  const [headline1, setHeadline1] = useState("");
  const [headline1Color, setHeadline1Color] = useState("");
  const [headline1Size, setHeadline1Size] = useState("");
  const [headline2, setHeadline2] = useState("");
  const [headline2Color, setHeadline2Color] = useState("");
  const [headline2Size, setHeadline2Size] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [bodyTextColor, setBodyTextColor] = useState("");
  const [bodyTextSize, setBodyTextSize] = useState("");
  const [ctaButtonText, setCtaButtonText] = useState("");
  const [ctaButtonColor, setCtaButtonColor] = useState("");
  const [ctaButtonTextColor, setCtaButtonTextColor] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [demoButtonText, setDemoButtonText] = useState("");
  const [demoButtonColor, setDemoButtonColor] = useState("");
  const [demoButtonTextColor, setDemoButtonTextColor] = useState("");
  const [demoUrl, setDemoUrl] = useState("");

  const fileInputRef = useRef(null);
  const { saveHeroSection, loading } = useSaveHeroSection();

  useEffect(() => {
    if (initialData) {
      setHeroImg(initialData.hero_img || "");
      setHeadline1(initialData.headline1 || "");
      setHeadline1Color(initialData.headline1_color || "");
      setHeadline1Size(initialData.headline1_size?.toString() || "");
      setHeadline2(initialData.headline2 || "");
      setHeadline2Color(initialData.headline2_color || "");
      setHeadline2Size(initialData.headline2_size?.toString() || "");
      setBodyText(initialData.body_text || "");
      setBodyTextColor(initialData.body_text_color || "");
      setBodyTextSize(initialData.body_text_size?.toString() || "");
      setCtaButtonText(initialData.cta_button_text || "");
      setCtaButtonColor(initialData.cta_button_color || "");
      setCtaButtonTextColor(initialData.cta_button_text_color || "");
      setCtaUrl(initialData.dynamic_url || "");
      setDemoButtonText(initialData.demo_button_text || "");
      setDemoButtonColor(initialData.demo_button_color || "");
      setDemoButtonTextColor(initialData.demo_button_text_color || "");
      setDemoUrl(initialData.dynamic_url_demo || "");
      if (initialData.hero_img) {
        setHeroImg(initialData.hero_img);
        setHeroImgPreview(initialData.hero_img);
      }
    }
  }, [initialData]);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setHeroImg(file.name);
      setHeroImgPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleUrlChange = useCallback((e) => {
    const url = e.target.value;
    setFile(null);
    setHeroImg(url);
    setHeroImgPreview(url);
  }, []);

  const handleChooseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleSizeChange = useCallback(
    (setter, maxSize) => (e) => {
      const value = e.target.value.replace(/\D/g, "");
      if (value === "" || Number(value) <= maxSize) {
        setter(value);
      }
    },
    []
  );

  const resetUrlFields = (type) => {
    if (type === "cta") {
      setCtaUrl("");
    } else if (type === "demo") {
      setDemoUrl("");
    }
  };

  const handleSave = useCallback(async () => {
    try {
      await saveHeroSection({
        templateId,
        sequence,
        hero_img: file ? "" : heroImg,  // If file selected, send in 'file', else send URL
        file: file || null, // Send file if selected
        headline1,
        headline1_size: parseInt(headline1Size) || null,
        headline1_color: headline1Color,
        headline2,
        headline2_size: parseInt(headline2Size) || null,
        headline2_color: headline2Color,
        body_text: bodyText,
        body_text_size: parseInt(bodyTextSize) || null,
        body_text_color: bodyTextColor,
        cta_button_text: ctaButtonText,
        cta_button_color: ctaButtonColor,
        cta_button_text_color: ctaButtonTextColor,
        dynamic_url: ctaUrl,  // CTA Button URL
        demo_button_text: demoButtonText,
        demo_button_color: demoButtonColor,
        demo_button_text_color: demoButtonTextColor,
        dynamic_url_demo: demoUrl,  // Demo Button URL
      });

      if (onSectionSave) {
        onSectionSave();
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to save section:", error);
    }
  }, [
    templateId,
    sequence,
    heroImg,
    file,
    headline1,
    headline1Color,
    headline1Size,
    headline2,
    headline2Color,
    headline2Size,
    bodyText,
    bodyTextColor,
    bodyTextSize,
    ctaButtonText,
    ctaButtonColor,
    ctaButtonTextColor,
    ctaUrl,
    demoButtonText,
    demoButtonColor,
    demoButtonTextColor,
    demoUrl,
    saveHeroSection,
    onSectionSave,
    onClose,
  ]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onClose}>
            <ArrowLeft size={16} />
            Hero Section | {sequence}
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.mainSection}>
            <div className={styles.uploadSection}>
              <label>Upload Static Image or Select Dynamic Image</label>
              <div className={styles.uploadGroup}>
                <InputField
                  value={heroImg}
                  onChange={handleUrlChange}
                  placeholder="Enter Image URL or Upload Image"
                />
                <button
                  className={styles.chooseButton}
                  onClick={handleChooseClick}
                >
                  Choose
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e);
                    handleChooseClick();
                  }}
                  className={styles.hiddenInput}
                />
              </div>
              {heroImgPreview && (
                <div className={styles.previewContainer}>
                  <img
                    src={heroImgPreview}
                    alt="Preview"
                    className={styles.preview}
                  />
                </div>
              )}
            </div>

            <div className={styles.selectSection}>
              <CategoryDropdown
                key={heroImg}
                options={dynamicImage}
                buttonText="Select Dynamic URL to fetch image"
                onSelect={(value) => setHeroImg(value)}
                allowAddNew={false}
              />
            </div>

            {/* Headline 1 */}
            <div className={styles.inputGroup}>
              <label>Headline 1</label>
              <InputField
                value={headline1}
                onChange={(e) => setHeadline1(e.target.value)}
                placeholder="Enter Headline 1 Text"
              />
              <div className={styles.inputControls}>
                <ColorInput
                  label="Choose Heading 1 Color"
                  value={headline1Color}
                  onChange={setHeadline1Color}
                />
                <InputField
                  label="Size"
                  value={headline1Size}
                  onChange={handleSizeChange(setHeadline1Size, 26)}
                  placeholder="Max 26px"
                />
              </div>
            </div>

            {/* Headline 2 */}
            <div className={styles.inputGroup}>
              <label>Headline 2</label>
              <InputField
                value={headline2}
                onChange={(e) => setHeadline2(e.target.value)}
                placeholder="Enter Headline 2 Text"
              />
              <div className={styles.inputControls}>
                <ColorInput
                  label="Choose Heading 2 Color"
                  value={headline2Color}
                  onChange={setHeadline2Color}
                />
                <InputField
                  label="Size"
                  value={headline2Size}
                  onChange={handleSizeChange(setHeadline2Size, 36)}
                  placeholder="Max 36px"
                />
              </div>
            </div>

            {/* Body Text */}
            <div className={styles.inputGroup}>
              <label>Body Text</label>
              <InputField
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                placeholder="Enter Body Text"
                multiline
              />
              <div className={styles.inputControls}>
                <ColorInput
                  label="Choose Body Text Color"
                  value={bodyTextColor}
                  onChange={setBodyTextColor}
                />
                <InputField
                  label="Size"
                  value={bodyTextSize}
                  onChange={handleSizeChange(setBodyTextSize, 18)}
                  placeholder="Max 18px"
                />
              </div>
            </div>

            {/* CTA and Demo Button Sections */}
            <div className={styles.inputGroup}>
              <label>CTA Button Text</label>
              <InputField
                value={ctaButtonText}
                onChange={(e) => setCtaButtonText(e.target.value)}
                placeholder="Enter CTA Button Text"
              />
              <ColorInput
                placeholder="CTA Button Color"
                value={ctaButtonColor}
                onChange={setCtaButtonColor}
              />
              <ColorInput
                placeholder="CTA Button Text Color"
                value={ctaButtonTextColor}
                onChange={setCtaButtonTextColor}
              />
              <InputField
                placeholder="Enter Static URL"
                value={ctaUrl}
                onChange={(e) => {
                  setCtaUrl(e.target.value);
                }}
              />
              <CategoryDropdown
                options={dynamicURL.map((field) => ({
                  label: field,
                  value: field,
                }))}
                key={ctaUrl}
                buttonText="Select Dynamic URL for CTA"
                onSelect={(value) => {
                  setCtaUrl(value);
                  resetUrlFields("cta");
                }}
                allowAddNew={false}
              />

            </div>

            <div className={styles.inputGroup}>
              <label>Demo Button Text</label>
              <InputField
                value={demoButtonText}
                onChange={(e) => setDemoButtonText(e.target.value)}
                placeholder="Enter Demo Button Text"
              />
              <ColorInput
                placeholder="Demo Button Color"
                value={demoButtonColor}
                onChange={setDemoButtonColor}
              />
              <ColorInput
                placeholder="Demo Button Text Color"
                value={demoButtonTextColor}
                onChange={setDemoButtonTextColor}
              />
              <InputField
                placeholder="Enter Static URL"
                value={demoUrl}
                onChange={(e) => {
                  setDemoUrl(e.target.value);
                }}
              />
              <CategoryDropdown
                options={dynamicURL.map((field) => ({
                  label: field,
                  value: field,
                }))}
                key={demoUrl}
                buttonText="Select Dynamic URL for Demo"
                onSelect={(value) => {
                  setDemoUrl(value); // Set the dynamic URL
                  resetUrlFields("demo"); // Reset static URL input when dynamic URL is selected
                }}
                allowAddNew={false}
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
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
