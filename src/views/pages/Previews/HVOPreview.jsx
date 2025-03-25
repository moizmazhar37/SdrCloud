import React from "react";
import styles from "./HVOPreview.module.scss";
import data from "./data";
import HighlightBanner from "./HighlightBanner/HighlightBanner";

// Adjust brightness helper function
const adjustBrightness = (hex, percent) => {
    let num = parseInt(hex.replace("#", ""), 16),
        r = Math.max(0, Math.min(255, (num >> 16) + percent)),
        g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + percent)),
        b = Math.max(0, Math.min(255, (num & 0x0000ff) + percent));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

// Function to generate a dynamic gradient from primary color
const generateGradient = (primaryColor) => {
    return `linear-gradient(135deg, ${primaryColor}, ${adjustBrightness(primaryColor, 30)})`;
};

const HVOPreview = () => {
    const primaryColor = data.primary_color || "#72056C"; // Default color
    const gradientBg = generateGradient(primaryColor);

    // Extract sections safely
    const headerSection = data.data_list.find((section) => section.sectionName === "HEADER");
    const heroSection = data.data_list.find((section) => section.sectionName === "HERO");
    const highlightBanner = data.data_list.find((section) => section.sectionName === "HIGHLIGHT_BANNER");
    const leftImageRightText = data.data_list.find((section) => section.sectionName === "RIGHT_TEXT_LEFT_IMAGE");
    const highlightBanner2 = data.data_list.find((section) => section.sectionName === "HIGHLIGHT_BANNER2");
    const leftTextRightImage = data.data_list.find((section) => section.sectionName === "LEFT_TEXT_RIGHT_IMAGE");

    return (
        <div className={styles.bgGradient} style={{ background: gradientBg }}>
            {/* Hero Section */}
            {heroSection && (
                <div className={styles.hero}>
                    <div className={styles.heroContent}>
                        {/* Header Section */}
                        {headerSection && (
                            <div className={styles.logoContainer}>
                                {headerSection.values.company_logo && (
                                    <img src={headerSection.values.company_logo} alt="Company Logo" className={styles.logo} />
                                )}
                                {headerSection.values.header_logo && (
                                    <img src={headerSection.values.header_logo} alt="Header Logo" className={styles.logo} />
                                )}
                            </div>
                        )}

                        {/* Hero Text Content */}
                        {heroSection.values.headline1 && (
                            <h1
                                className={styles.heroTitle}
                                style={{ fontSize: `${heroSection.values.headline1_size}px`, color: heroSection.values.headline1_color }}
                            >
                                {heroSection.values.headline1}
                            </h1>
                        )}
                        {heroSection.values.headline2 && (
                            <h2
                                style={{ fontSize: `${heroSection.values.headline2_size}px`, color: heroSection.values.headline2_color }}
                            >
                                {heroSection.values.headline2}
                            </h2>
                        )}
                        {heroSection.values.body_text && (
                            <p
                                style={{ fontSize: `${heroSection.values.body_text_size}px`, color: heroSection.values.body_text_color }}
                            >
                                {heroSection.values.body_text}
                            </p>
                        )}

                        {/* Buttons */}
                        <div className={styles.buttons}>
                            {heroSection.values.cta_button_text && (
                                <a href={heroSection.values.dynamic_url} target="_blank" rel="noopener noreferrer">
                                    <button
                                        style={{
                                            backgroundColor: heroSection.values.cta_button_color,
                                            color: heroSection.values.cta_button_text_color,
                                        }}
                                    >
                                        {heroSection.values.cta_button_text}
                                    </button>
                                </a>
                            )}
                            {heroSection.values.demo_button_text && (
                                <a href={heroSection.values.dynamic_url_demo} target="_blank" rel="noopener noreferrer">
                                    <button
                                        style={{
                                            backgroundColor: heroSection.values.demo_button_color,
                                            color: heroSection.values.demo_button_text_color,
                                        }}
                                    >
                                        {heroSection.values.demo_button_text}
                                    </button>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Hero Image */}
                    {heroSection.values.hero_img && (
                        <img className={styles.heroImage} src={heroSection.values.hero_img} alt="Hero" />
                    )}
                </div>
            )}

            {/* Highlight Banner */}
            {highlightBanner && <HighlightBanner bannerData={highlightBanner} />}

            {/* Left Image Right Text Section */}
            {leftImageRightText && (
                <div className={styles.leftImageRightText}>
                    <div className={styles.container}>
                        <img
                            src={leftImageRightText.values.left_image_right_text}
                            className={styles.sectionImage}
                        />
                        <div className={styles.textContent}>
                            <h2
                                style={{
                                    fontSize: `${leftImageRightText.values.headline1_size}px`,
                                    color: leftImageRightText.values.headline1_color,
                                }}
                            >
                                {leftImageRightText.values.headline1}
                            </h2>
                            <h3
                                style={{
                                    fontSize: `${leftImageRightText.values.headline2_size}px`,
                                    color: leftImageRightText.values.headline2_color,
                                }}
                            >
                                {leftImageRightText.values.headline2}
                            </h3>
                            <p
                                style={{
                                    fontSize: `${leftImageRightText.values.body_text_size}px`,
                                    color: leftImageRightText.values.body_text_color,
                                }}
                            >
                                {leftImageRightText.values.body_text}
                            </p>
                        </div>
                    </div>
                </div>
            )}


            {/* highlight banner 2 */}
            {highlightBanner2 && (
                <div
                    className={styles.highlightBanner2}
                    style={{ backgroundColor: highlightBanner2.values.banner_color }}
                >
                    <p
                        style={{
                            fontSize: `${highlightBanner2.values.banner2_text_size}px`,
                            color: highlightBanner2.values.banner_text_color,
                        }}
                    >
                        {highlightBanner2.values.banner_text}
                    </p>
                    {highlightBanner2.values.cta_button_text && (
                        <a
                            href={highlightBanner2.values.static_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button
                                style={{
                                    backgroundColor: highlightBanner2.values.banner_button_color,
                                    color: highlightBanner2.values.banner_button_text_color,
                                }}
                            >
                                {highlightBanner2.values.cta_button_text}
                            </button>
                        </a>
                    )}
                </div>
            )}


            {/*  right image left text */}
            {leftTextRightImage && (
    <div className={styles.leftTextRightImage}>
        <div className={styles.container}>
            <div className={styles.textContent}>
                <h2
                    style={{
                        fontSize: `${leftTextRightImage.values.headline1_size}px`,
                        color: leftTextRightImage.values.headline1_color,
                    }}
                >
                    {leftTextRightImage.values.headline1}
                </h2>
                <h3
                    style={{
                        fontSize: `${leftTextRightImage.values.headline2_size}px`,
                        color: leftTextRightImage.values.headline2_color,
                    }}
                >
                    {leftTextRightImage.values.headline2}
                </h3>
                <p
                    style={{
                        fontSize: `${leftTextRightImage.values.body_text_size}px`,
                        color: leftTextRightImage.values.body_text_color,
                    }}
                >
                    {leftTextRightImage.values.body_text}
                </p>
            </div>
            <img
                src={leftTextRightImage.values.left_text_right_image_url}
                className={styles.sectionImage}
            />
        </div>
    </div>
)}


        </div>
    );
};

export default HVOPreview;
