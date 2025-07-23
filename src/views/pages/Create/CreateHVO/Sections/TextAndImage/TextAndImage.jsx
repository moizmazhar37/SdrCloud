import React, { useState, useRef, useEffect, useCallback } from "react";
import CategoryDropdown from "../../../CreateVideo/CategoryDropdown/CategoryDropdown";
import ColorInput from "src/Common/ColorInput/ColorInput";
import CopyText from "src/Common/CopyText/CopyText";
import InputField from "src/Common/InputField/InputField";
import { ArrowLeft } from "lucide-react";
import styles from "./TextImage.module.scss";
import useSaveRightTextLeftImage from "../../Hooks/TextImage/useSaveRightTextLeftImage";
import useUpdateRightTextLeftImage from "../../Hooks/TextImage/useUpdateRightTextLeftImage";
import useSaveLeftTextRightImage from "../../Hooks/TextImage/useSaveLeftTextRightImage";
import useUpdateLeftTextRightImage from "../../Hooks/TextImage/useUpdateLeftTextRightImage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles



const TextImage = ({
  dynamicImageOptions = [],
  dynamicFields = [],
  isRightText = false,
  templateId,
  sequence,
  onSectionSave,
  onClose,
  initialData,
}) => {
  const [headline1, setHeadline1] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [headline2, setHeadline2] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [headline1Color, setHeadline1Color] = useState("");
  const [headline2Color, setHeadline2Color] = useState("");
  const [bodyTextColor, setBodyTextColor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [size1, setSize1] = useState("");
  const [size2, setSize2] = useState("");
  const [bodySize, setBodySize] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDynamicOption, setSelectedDynamicOption] = useState(null);
  const fileInputRef = useRef(null);

  // Save hooks
  const {
    saveTextImage: saveRightTextLeftImage,
    loading: saveRightTextLoading,
  } = useSaveRightTextLeftImage();
  const { saveLeftTextRightImage, loading: saveLeftTextLoading } =
    useSaveLeftTextRightImage();

  // Update hooks
  const { updateRightTextLeftImage, loading: updateRightTextLoading } =
    useUpdateRightTextLeftImage();
  const { updateLeftTextRightImage, loading: updateLeftTextLoading } =
    useUpdateLeftTextRightImage();

  useEffect(() => {
    if (initialData) {
      setHeadline1(initialData.headline1 || "");
      setHeadline2(initialData.headline2 || "");
      setBodyText(initialData.body_text || "");
      setHeadline1Color(initialData.headline1_color || "");
      setHeadline2Color(initialData.headline2_color || "");
      setBodyTextColor(initialData.body_text_color || "");
      setSize1(initialData.headline1_size?.toString() || "");
      setSize2(initialData.headline2_size?.toString() || "");
      setBodySize(initialData.body_text_size?.toString() || "");

      if (isRightText && initialData.left_image_right_text) {
        setImageUrl(initialData.left_image_right_text);
        setPreviewUrl(initialData.left_image_right_text);
        setSelectedDynamicOption(initialData.left_image_right_text);
      } else if (!isRightText && initialData.left_text_right_image_url) {
        setImageUrl(initialData.left_text_right_image_url);
        setPreviewUrl(initialData.left_text_right_image_url);
        setSelectedDynamicOption(initialData.left_text_right_image_url);
      }
    }
  }, [initialData, isRightText]);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImageUrl(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      setSelectedDynamicOption(null);
    }
  }, []);

  const handleUrlChange = useCallback((e) => {
    const url = e.target.value;
    setSelectedFile(null);
    setImageUrl(url);
    setPreviewUrl(url);
    setSelectedDynamicOption(null);
  }, []);


  const handleClose = () => {
    onClose();
  };

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

  const handleDynamicSelect = useCallback((value) => {
    setSelectedFile(null);
    setImageUrl(`[${value}]`);
    setPreviewUrl(value);
    setSelectedDynamicOption(`[${value}]`);
  }, []);

  const handleSave = useCallback(async () => {
    const data = {
      templateId,
      sequence,
      bodyText,
      headline1,
      headline2,
      bodyTextColor,
      bodyTextSize: parseInt(bodySize) || null,
      headline1Color,
      headline1Size: parseInt(size1) || null,
      headline2Color,
      headline2Size: parseInt(size2) || null,
      image: selectedFile || selectedDynamicOption || imageUrl || null,
      ctaUrl: ctaUrl || null,

    };

    try {
      if (initialData) {
        // Update existing section
        if (isRightText) {
          await updateRightTextLeftImage(data, initialData.id);
        } else {
          await updateLeftTextRightImage(data, initialData.id);
        }
      } else {
        // Create new section
        if (isRightText) {
          await saveRightTextLeftImage(data);
        } else {
          await saveLeftTextRightImage(data);
        }
      }

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
    initialData,
    isRightText,
    templateId,
    sequence,
    bodyText,
    headline1,
    headline2,
    bodyTextColor,
    bodySize,
    headline1Color,
    size1,
    headline2Color,
    size2,
    selectedFile,
    selectedDynamicOption,
    imageUrl,
    updateRightTextLeftImage,
    updateLeftTextRightImage,
    saveRightTextLeftImage,
    saveLeftTextRightImage,
    onSectionSave,
    onClose,
  ]);

  const sectionTitle = isRightText
    ? "Right Text | Left Image"
    : "Left Text | Right Image";

  const loading = initialData
    ? isRightText
      ? updateRightTextLoading
      : updateLeftTextLoading
    : isRightText
    ? saveRightTextLoading
    : saveLeftTextLoading;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onClose}>
            <ArrowLeft size={16} />
            {sectionTitle} | Section {sequence}
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.mainSection}>
            <div className={styles.uploadSection}>
              <label>Upload Static Image</label>
              <div className={styles.uploadGroup}>
                <InputField
                  value={imageUrl}
                  onChange={handleUrlChange}
                  placeholder="Upload Image or Enter URL"
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
                  onChange={handleImageChange}
                  className={styles.hiddenInput}
                />
              </div>
              {previewUrl && (
                <div className={styles.previewContainer}>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className={styles.preview}
                  />
                </div>
              )}
            </div>

            <div className={styles.selectSection}>
              <label>Select Dynamic Image</label>
              <CategoryDropdown
                options={dynamicImageOptions}
                buttonText="Select Dynamic URL to fetch image"
                onSelect={handleDynamicSelect}
                allowAddNew={false}
                value={selectedDynamicOption}
              />
            </div>

            <div className={styles.textSection}>
              <div className={styles.inputGroup}>
                <label>Headline 1</label>
                <InputField
                  value={headline1}
                  onChange={(e) => setHeadline1(e.target.value)}
                  placeholder="Enter Your Text Here"
                />
                <div className={styles.inputControls}>
                  <div className={styles.colorInput}>
                    <label>Choose Heading 1 Color</label>
                    <ColorInput
                      value={headline1Color}
                      onChange={setHeadline1Color}
                    />
                  </div>
                  <div className={styles.sizeInput}>
                    <label>Size (Max 26 px.)</label>
                    <InputField
                      value={size1}
                      onChange={handleSizeChange(setSize1, 26)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Headline 2</label>
                <InputField
                  value={headline2}
                  onChange={(e) => setHeadline2(e.target.value)}
                  placeholder="Enter Your Text Here"
                />
                <div className={styles.inputControls}>
                  <div className={styles.colorInput}>
                    <label>Choose Heading 2 Color</label>
                    <ColorInput
                      value={headline2Color}
                      onChange={setHeadline2Color}
                    />
                  </div>
                  <div className={styles.sizeInput}>
                    <label>Size (Max 36 px.)</label>
                    <InputField
                      value={size2}
                      onChange={handleSizeChange(setSize2, 36)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
  <label>Body Text</label>

  <div className={styles.quillWrapper}>
    <ReactQuill
      value={bodyText}
      onChange={setBodyText}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["link"],
          ["clean"],
        ],
      }}
      formats={[
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
      ]}
      placeholder="Enter your text here"
      style={{
        color: bodyTextColor,
        fontSize: `${bodySize}px`,
      }}
    />
  </div>

  <div className={styles.inputControls}>
    <div className={styles.colorInput}>
      <label>Choose Body Text Color</label>
      <ColorInput
        value={bodyTextColor}
        onChange={setBodyTextColor}
      />
    </div>
    <div className={styles.sizeInput}>
      <label>Size (Max 18 px.)</label>
      <InputField
        value={bodySize}
        onChange={handleSizeChange(setBodySize, 18)}
      />
    </div>
  </div>
</div>

              <div className={styles.inputGroup}>
                <label>CTA URL</label>
                <InputField
                  value={ctaUrl}
                  onChange={(e) => setCtaUrl(e.target.value)}
                  placeholder="Enter Your CTA URL Here"
                />
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
    </div>
  );
};

export default TextImage;
