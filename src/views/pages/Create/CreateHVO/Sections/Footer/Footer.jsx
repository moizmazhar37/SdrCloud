import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import ColorInput from "src/Common/ColorInput/ColorInput";
import InputField from "src/Common/InputField/InputField";
import styles from "./Footer.module.scss";
import useSaveFooter from "../../Hooks/Footer/useSaveFooter";
import useUpdateFooter from "../../Hooks/Footer/useUpdateFooter";
import useGetFooters from "../../../../settings/IntentTracking/hooks/useGetFooter";

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
  const [selectedFooterLinks, setSelectedFooterLinks] = useState([]);

  // Fetch footer links from API
  const { data: footerLinks, loading: loadingFooters } = useGetFooters();

  const { saveFooter, loading: saveLoading } = useSaveFooter();
  const { updateFooter, loading: updateLoading } = useUpdateFooter();

  // Handler for size inputs with max value validation
  const handleSizeChange = (setter, maxSize) => (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "" || Number(value) <= maxSize) {
      setter(value);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const toggleFooterLink = (linkId) => {
    setSelectedFooterLinks((prev) => {
      if (prev.includes(linkId)) {
        return prev.filter((id) => id !== linkId);
      } else {
        return [...prev, linkId];
      }
    });
  };

  useEffect(() => {
    if (initialData) {
      setFooterBgColor(initialData.footer_background_color || "");
      setFooterHeadingColor(initialData.footer_text_heading_color || "");
      setHeadingSize(initialData.headingSize?.toString() || "0");
      setFooterTextColor(initialData.footer_text_heading_color || "");
      setFooterHoverColor(
        initialData.footer_text_hover_color?.toString() || ""
      );
      setIconBgColor(initialData.iconBgColor || "");
      setIconColor(initialData.iconColor || "");
      setBenchmarkColor(initialData.benchmark_color || "");
      setBenchmarkSize(initialData.benchmar_size?.toString() || "0");
      setInstagramLink(initialData.instagram_link || "");
      setFacebookLink(initialData.facebook_link || "");
      setLinkedInLink(initialData.linkedin_link || "");
      setTextSize(initialData.footer_text_size || "");
      setIconBgColor(initialData.social_icon_background_color || "");
      setIconColor(initialData.social_icon_color || "");

      // Initialize selected footer links if available in initialData
      if (initialData.selected_footer_links) {
        setSelectedFooterLinks(initialData.selected_footer_links);
      }
    }
  }, [initialData]);

  const handleSave = async () => {
    const footerData = {
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
      selectedFooterLinks: selectedFooterLinks,
    };

    try {
      if (initialData?.id) {
        await updateFooter(initialData.id, footerData);
      } else {
        await saveFooter(footerData);
      }

      if (onSectionSave) {
        onSectionSave();
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to save/update footer:", error);
    }
  };

  const loading = saveLoading || updateLoading;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={handleClose}>
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

          {/* Footer Links Section */}
          <div className={styles.footerLinksSection}>
            <h3 className={styles.footerLinksTitle}>Footer Links</h3>
            <div className={styles.footerLinksContainer}>
              {loadingFooters ? (
                <p>Loading footer links...</p>
              ) : footerLinks && footerLinks.length > 0 ? (
                footerLinks.map((link) => (
                  <button
                    key={link.id}
                    className={`${styles.footerLinkButton} ${
                      selectedFooterLinks.includes(link.id)
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => toggleFooterLink(link.id)}
                  >
                    {link.name}
                  </button>
                ))
              ) : (
                <p>No footer links available</p>
              )}
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

export default Footer;
