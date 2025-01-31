import React, { useState, useRef } from "react";
import CategoryDropdown from "../../../CreateVideo/CategoryDropdown/CategoryDropdown";
import ColorInput from "src/Common/ColorInput/ColorInput";
import CopyText from "src/Common/CopyText/CopyText";
import InputField from "src/Common/InputField/InputField";
import { ArrowLeft } from "lucide-react";
import styles from "./TextImage.module.scss";

const TextImage = ({ dynamicImageOptions = [], dynamicFields = [] }) => {
  const [headline1, setHeadline1] = useState("");
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
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreviewUrl(url);
  };

  const handleChooseClick = () => {
    fileInputRef.current?.click();
  };

  const handleSizeChange = (setter, maxSize) => (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "" || Number(value) <= maxSize) {
      setter(value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton}>
            <ArrowLeft size={16} />
            Left Text | Right Image | Section 1
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
                onSelect={(value) => setPreviewUrl(value)}
                allowAddNew={false}
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
                <InputField
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  placeholder="Enter Your Text Here"
                  multiline
                />
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
            </div>
          </div>

          <div className={styles.copySection}>
            <CopyText fields={dynamicFields} />
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.saveButton}>Save</button>
          <button className={styles.nextButton}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default TextImage;
