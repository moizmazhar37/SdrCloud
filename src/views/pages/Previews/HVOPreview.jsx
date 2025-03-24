import React from "react";
import styles from "./HVOPreview.module.scss";
import data from "./data";
import HighlightBanner from "./HighlightBanner/HighlightBanner";

// Function to generate a dynamic gradient from primary color
const generateGradient = (primaryColor) => {
    return `linear-gradient(135deg, ${primaryColor}, ${adjustBrightness(primaryColor, 30)})`;
};

// Adjust brightness helper function
const adjustBrightness = (hex, percent) => {
    let num = parseInt(hex.replace("#", ""), 16),
        r = (num >> 16) + percent,
        g = ((num >> 8) & 0x00ff) + percent,
        b = (num & 0x0000ff) + percent;

    return `#${(
        (1 << 24) +
        (Math.max(0, Math.min(255, r)) << 16) +
        (Math.max(0, Math.min(255, g)) << 8) +
        Math.max(0, Math.min(255, b))
    )
        .toString(16)
        .slice(1)}`;
};

const HVOPreview = () => {
    const primaryColor = data.primary_color || "#72056C"; // Default color
    const gradientBg = generateGradient(primaryColor);

    // Extract header and hero section data safely
    const headerSection = data.data_list.find((section) => section.sectionName === "HEADER");
    const heroSection = data.data_list.find((section) => section.sectionName === "HERO");

    return (
        <div className={styles.bgGradient} style={{ background: gradientBg }}>
            {/* Header Section - Only render if data exists */}


            {/* Hero Section - Only render if data exists */}
            {heroSection && (
                <div className={styles.hero}>

                    <div className={styles.heroContent}>
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
            {data.data_list.find((section) => section.sectionName === "HIGHLIGHT_BANNER") && (
                <HighlightBanner bannerData={data.data_list.find((section) => section.sectionName === "HIGHLIGHT_BANNER")} />
            )}

            


        </div>
    );
};

export default HVOPreview;
