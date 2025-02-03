import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import ColorInput from "src/Common/ColorInput/ColorInput";
import InputField from "src/Common/InputField/InputField";
import styles from "./Footer.module.scss";
import useSaveFooter from "../../Hooks/Footer/useSaveFooter";

const Footer = ({
  onSectionSave,
  onClose,
  templateId,
  sequence,
  initialData,
}) => {
  // State management for all fields
  const [footerBgColor, setFooterBgColor] = useState("");
  const [footerHeadingColor, setFooterHeadingColor] = useState("");
  const [headingSize, setHeadingSize] = useState("");
  const [footerTextColor, setFooterTextColor] = useState("");
  const [footerHoverColor, setFooterHoverColor] = useState("");
  const [textSize, setTextSize] = useState("");
  const [iconBgColor, setIconBgColor] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [benchmarkColor, setBenchmarkColor] = useState("");
  const [benchmarkSize, setBenchmarkSize] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");

  const { saveFooter, loading } = useSaveFooter();

  // Handler for size inputs with max value validation
  const handleSizeChange = (setter, maxSize) => (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "" || Number(value) <= maxSize) {
      setter(value);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFooterBgColor(initialData.footerBgColor || "");
      setFooterHeadingColor(initialData.footerHeadingColor || "");
      setHeadingSize(initialData.headingSize?.toString() || "0");
      setFooterTextColor(initialData.footerTextColor || "");
      setFooterTextColor(initialData.footerTextColor || "");
      setFooterHoverColor(initialData.footerHoverColor?.toString() || "0");
      setIconBgColor(initialData.iconBgColor || "");
      setIconColor(initialData.iconColor || "");
      setBenchmarkColor(initialData.benchmarkColor || "");
      setBenchmarkSize(initialData.benchmarkSize?.toString() || "0");
      setInstagramLink(initialData.instagramLink || "");
      setFacebookLink(initialData.facebookLink || "");
      setLinkedInLink(initialData.linkedInLink || "");
    }
  }, [initialData]);
  
  const handleSave = async () => {
    try {
      await saveFooter({
        templateId,
        sequence,
        footerBackgroundColor: footerBgColor,
        footerTextHeadingColor: footerHeadingColor,
        footerHeadingSize: headingSize,
        footerTextColor: footerTextColor,
        footerTextHoverColor: footerHoverColor,
        footerTextSize: textSize,
        socialIconBackgroundColor: iconBgColor,
        socialIconColor: iconColor,
        benchmarkColor: benchmarkColor,
        benchmarkSize: benchmarkSize,
        instagramLink: instagramLink,
        facebookLink: facebookLink,
        linkedinLink: linkedInLink,
      });
  
      if (onSectionSave) {
        onSectionSave();
      }
  
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to save footer:", error);
    }
  };
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton}>
            <ArrowLeft size={16} />
            Footer | Section 1
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.colorRow}>
            <div className={styles.colorField}>
              <label>Choose Footer Background Color</label>
              <ColorInput value={footerBgColor} onChange={setFooterBgColor} />
            </div>
            <div className={styles.colorField}>
              <label>Choose Footer Heading Text Color</label>
              <ColorInput
                value={footerHeadingColor}
                onChange={setFooterHeadingColor}
              />
            </div>
            <div className={styles.sizeField}>
              <label>Size</label>
              <InputField
                value={headingSize}
                onChange={handleSizeChange(setHeadingSize, 20)}
                placeholder="00"
              />
              <span className={styles.maxSize}>(Max 20 px.)</span>
            </div>
          </div>

          <div className={styles.colorRow}>
            <div className={styles.colorField}>
              <label>Choose Footer Text Color</label>
              <ColorInput
                value={footerTextColor}
                onChange={setFooterTextColor}
              />
            </div>
            <div className={styles.colorField}>
              <label>Choose Footer Text Hover Color</label>
              <ColorInput
                value={footerHoverColor}
                onChange={setFooterHoverColor}
              />
            </div>
            <div className={styles.sizeField}>
              <label>Size</label>
              <InputField
                value={textSize}
                onChange={handleSizeChange(setTextSize, 20)}
                placeholder="00"
              />
              <span className={styles.maxSize}>(Max 20 px.)</span>
            </div>
          </div>

          <div className={styles.colorRow}>
            <div className={styles.colorField}>
              <label>Choose Icon Background Color</label>
              <ColorInput value={iconBgColor} onChange={setIconBgColor} />
            </div>
            <div className={styles.colorField}>
              <label>Choose Icon Color</label>
              <ColorInput value={iconColor} onChange={setIconColor} />
            </div>
          </div>

          <div className={styles.colorRow}>
            <div className={styles.colorField}>
              <label>Choose Benchmark Color</label>
              <ColorInput value={benchmarkColor} onChange={setBenchmarkColor} />
            </div>
            <div className={styles.sizeField}>
              <label>Size</label>
              <InputField
                value={benchmarkSize}
                onChange={handleSizeChange(setBenchmarkSize, 22)}
                placeholder="00"
              />
              <span className={styles.maxSize}>(Max 22 px.)</span>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <div className={styles.linkField}>
              <label>Instagram Link</label>
              <InputField
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
                placeholder="Enter Instagram link"
              />
            </div>
            <div className={styles.linkField}>
              <label>Facebook Link</label>
              <InputField
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                placeholder="Enter Facebook link"
              />
            </div>
            <div className={styles.linkField}>
              <label>LinkedIn Link</label>
              <InputField
                value={linkedInLink}
                onChange={(e) => setLinkedInLink(e.target.value)}
                placeholder="Enter LinkedIn link"
              />
            </div>
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
        <button className={styles.nextButton}>Next</button>
      </div>
      </div>
    </div>
  );
};

export default Footer;
