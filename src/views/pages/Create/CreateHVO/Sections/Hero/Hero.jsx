import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import CategoryDropdown from "../../../CreateVideo/CategoryDropdown/CategoryDropdown";
import ColorInput from "src/Common/ColorInput/ColorInput";
import CopyText from "src/Common/CopyText/CopyText";
import InputField from "src/Common/InputField/InputField";
import { ArrowLeft } from "lucide-react";
import styles from "./Hero.module.scss";
import useSaveHeroSection from "../../Hooks/Hero/useSaveHero";
import useUpdateHeroSection from "../../Hooks/Hero/useUpdateHero";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "color",
  "background",
  "align",
  "link",
];

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
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
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
  const thumbnailInputRef = useRef(null);
  const { saveHeroSection, loading: saveLoading } = useSaveHeroSection();
  const { updateHeroSection, loading: updateLoading } = useUpdateHeroSection();
  const [isEditMode, setIsEditMode] = useState(false);

  const loading = isEditMode ? updateLoading : saveLoading;

  useEffect(() => {
    if (initialData) {
      setIsEditMode(true);
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
      setThumbnail(initialData.thumbnail || "");
      setThumbnailPreview(initialData.thumbnail || "");
      if (initialData.hero_img) {
        setHeroImg(initialData.hero_img);
        setHeroImgPreview(initialData.hero_img);
      }
    }
  }, [initialData]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setHeroImg(file.name);
      const url = URL.createObjectURL(file);
      setHeroImgPreview(url);
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

  const handleThumbnailChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnail(file.name);
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
    }
  }, []);

  const handleThumbnailUrlChange = useCallback((e) => {
    const url = e.target.value;
    setThumbnailFile(null);
    setThumbnail(url);
    setThumbnailPreview(url);
  }, []);

  const handleThumbnailChooseClick = useCallback(() => {
    thumbnailInputRef.current?.click();
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

  const handleClose = () => {
    onClose();
  };

  const normalizeUrl = (url) => {
    let input = url.trim();
    if (/^https?:\/\//i.test(input)) {
      return input;
    }
    return "https://" + input;
  };

  const handleSave = useCallback(async () => {
    const heroSectionData = {
      templateId,
      sequence,
      hero_img: !file && heroImg ? heroImg : "",
      file: file || null,
      thumbnail: !thumbnailFile && thumbnail ? thumbnail : "",
      thumbnailFile: thumbnailFile || null,
      headline1,
      headline1_size: parseInt(headline1Size) || null,
      headline1_color: headline1Color,
      headline2,
      headline2_size: parseInt(headline2Size) || null,
      headline2_color: headline2Color,
      body_text: bodyText, // This now contains HTML
      body_text_size: parseInt(bodyTextSize) || null,
      body_text_color: bodyTextColor,
      cta_button_text: ctaButtonText,
      cta_button_color: ctaButtonColor,
      cta_button_text_color: ctaButtonTextColor,
      dynamic_url: ctaUrl,
      demo_button_text: demoButtonText,
      demo_button_color: demoButtonColor,
      demo_button_text_color: demoButtonTextColor,
      dynamic_url_demo: demoUrl,
    };

    try {
      if (initialData?.id && isEditMode) {
        await updateHeroSection(initialData.id, heroSectionData);
      } else {
        await saveHeroSection(heroSectionData);
      }

      if (onSectionSave) {
        onSectionSave();
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to save/update section:", error);
    }
  }, [
    templateId,
    sequence,
    heroImg,
    file,
    thumbnail,
    thumbnailFile,
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
    initialData?.id,
    saveHeroSection,
    updateHeroSection,
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
              <label>Upload or Paste Image/Video Link</label>
              <div className={styles.uploadGroup}>
                <InputField
                  value={heroImg}
                  onChange={handleUrlChange}
                  placeholder="Paste Image or Video URL"
                />
                <button
                  className={styles.chooseButton}
                  onClick={handleChooseClick}
                >
                  Choose File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className={styles.hiddenInput}
                />
              </div>

              {heroImgPreview && (
                <div className={styles.previewContainer}>
                  {file?.type?.startsWith("video/") ||
                  (!file && /\.(mp4|webm|ogg)$/i.test(heroImgPreview)) ? (
                    <video
                      src={heroImgPreview}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={styles.preview}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "400px",
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <img
                      src={heroImgPreview}
                      alt="Preview"
                      className={styles.preview}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "400px",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  )}
                </div>
              )}

              {/* Thumbnail Upload Section - Show only when video is uploaded */}
              {(file?.type?.startsWith("video/") || (!file && /\.(mp4|webm|ogg)$/i.test(heroImgPreview))) && (
                <div className={styles.thumbnailSection}>
                  <label>Video Thumbnail (Optional)</label>
                  <div className={styles.uploadGroup}>
                    <InputField
                      value={thumbnail}
                      onChange={handleThumbnailUrlChange}
                      placeholder="Paste Thumbnail Image URL"
                    />
                    <button
                      className={styles.chooseButton}
                      onClick={handleThumbnailChooseClick}
                    >
                      Choose Thumbnail
                    </button>
                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className={styles.hiddenInput}
                    />
                  </div>

                  {thumbnailPreview && (
                    <div className={styles.thumbnailPreviewContainer}>
                      <p className={styles.thumbnailLabel}>Thumbnail Preview:</p>
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail Preview"
                        className={styles.thumbnailPreview}
                        style={{
                          maxWidth: "200px",
                          maxHeight: "150px",
                          width: "auto",
                          height: "auto",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "2px solid #ddd",
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={styles.selectSection}>
              <CategoryDropdown
                key={heroImg}
                options={dynamicImage}
                buttonText="Select Dynamic URL to fetch image"
                onSelect={(value) => setHeroImg(`[${value}]`)}
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

            {/* Body Text with React Quill */}
            <div className={styles.inputGroup}>
              <label>Body Text</label>
              <div className={styles.quillWrapper}>
                <ReactQuill
                  theme="snow"
                  value={bodyText}
                  onChange={setBodyText}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Enter formatted body text..."
                  style={{
                    backgroundColor: "white",
                    minHeight: "150px",
                  }}
                />
              </div>
              <div className={styles.inputControls}>
                <ColorInput
                  label="Default Text Color"
                  value={bodyTextColor}
                  onChange={setBodyTextColor}
                />
                <InputField
                  label="Default Size"
                  value={bodyTextSize}
                  onChange={handleSizeChange(setBodyTextSize, 18)}
                  placeholder="Max 18px"
                />
              </div>
              <p className={styles.note}>
                Note: Color and size here set the default values. Users can
                override these using the editor toolbar.
              </p>
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
                onBlur={(e) => {
                  const normalized = normalizeUrl(e.target.value);
                  setCtaUrl(normalized);
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
                  setCtaUrl(`[${value}]`);
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
                onBlur={(e) => {
                  const normalized = normalizeUrl(e.target.value);
                  setDemoUrl(normalized);
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
                  setDemoUrl(`[${value}]`);
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
            {loading ? "Saving..." : isEditMode ? "Update" : "Save"}
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
    </div>
  );
};

export default HeroSection;
