import React, { useState, useEffect } from "react";
import CategoryDropdown from "../../../CreateVideo/CategoryDropdown/CategoryDropdown";
import ColorInput from "src/Common/ColorInput/ColorInput";
import CopyText from "src/Common/CopyText/CopyText";
import InputField from "src/Common/InputField/InputField";
import { ArrowLeft } from "lucide-react";
import styles from "./HighlightBanner2.module.scss";
import useSaveHighlightBanner2 from "../../Hooks/HighlightBanner2/useSaveHighlightBanner2";

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
    const { saveHighlightBanner2, loading } = useSaveHighlightBanner2();

    console.log(templateId, "fkslaskofuiouiowruo78907fsfjkl")

    useEffect(() => {
        if (initialData) {
            setBannerText(initialData.bannerText || "");
            setBannerColor(initialData.bannerColor || "");
            setTextColor(initialData.bannerTextColor || "");
            setSize(initialData.bannerTextSize?.toString() || "00");
            setCtaButtonText(initialData.ctaButtonText || "");
            setCtaButtonColor(initialData.ctaButtonColor || "");
            setCtaButtonTextColor(initialData.ctaButtonTextColor || "");
            setStaticUrl(initialData.staticUrl || "");
            setDynamicUrl(initialData.dynamicUrl || "");
        }
    }, [initialData]);

    const handleSave = async () => {
        try {
            // Determine the staticUrl to use based on selection
            const urlToSave = staticUrl || dynamicUrl;

            await saveHighlightBanner2({
                hvoTemplateId: templateId,
                sequence,
                ctaButtonText,
                bannerText,
                staticUrl: urlToSave,  // Store either static or dynamic URL
                ctaButtonColor,
                bannerColor,
                bannerButtonColor: ctaButtonColor,  // Assuming CTA button and banner share color
                bannerTextColor: textColor,
                bannerButtonTextColor: ctaButtonTextColor,
                bannerTextSize: parseInt(size) || 0, // Ensure text size is a number
            });

            if (onSectionSave) {
                onSectionSave();
            }

            if (onClose) {
                onClose();
            }
        } catch (error) {
            console.error("Failed to save banner:", error);
        }
    };

    const handleSizeChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (value === "" || parseInt(value) <= 32) {
            setSize(value);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={onClose}>
                    <ArrowLeft size={16} />
                    Highlight Banner 2 | Section 1
                </button>
            </div>

            <div className={styles.content}>
                <div className={styles.mainSection}>
                    <div className={styles.topControls}>
                        {/* Banner Text Field */}
                        <div className={styles.banner}>
                            <label>Banner Text</label>
                            <InputField
                                value={bannerText}
                                onChange={(e) => setBannerText(e.target.value)}
                                placeholder="Enter Your Banner Text Here"
                            />
                        </div>

                        {/* Banner Text Size Field */}
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

                    {/* Banner Color Controls */}
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

                    {/* CTA Button Text Field */}
                    <div className={styles.inputGroup}>
                        <label>CTA Button Text</label>
                        <InputField
                            value={ctaButtonText}
                            onChange={(e) => setCtaButtonText(e.target.value)}
                            placeholder="Enter Button Text"
                        />
                    </div>

                    {/* CTA Button Color Controls */}
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

                    {/* Static URL Input Field */}
                    <div className={styles.inputGroup}>
                        <label>If Static Enter Static URL Here</label>
                        <InputField
                            value={staticUrl}
                            onChange={(e) => {
                                setStaticUrl(e.target.value);
                                setDynamicUrl(""); // Clear dynamic URL if static URL is selected
                            }}
                            placeholder="Enter Link URL"
                        />
                    </div>

                    {/* Dynamic URL Selection Dropdown */}
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
                                setDynamicUrl(value);
                                setStaticUrl(""); // Clear static URL if dynamic URL is selected
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
                    {loading ? "Saving..." : "Save"}
                </button>
                <button className={styles.nextButton}>Next</button>
            </div>
        </div>
    );
};

export default HighlightBanner2;
