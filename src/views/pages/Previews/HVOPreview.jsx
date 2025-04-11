import React, { useState, useEffect } from "react";
import styles from "./HVOPreview.module.scss";
// import data from "./data";
import HighlightBanner from "./HighlightBanner/HighlightBanner";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import Footer from "./Footer/Footer";
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
  return `linear-gradient(135deg, ${primaryColor}, ${adjustBrightness(
    primaryColor,
    30
  )})`;
};

function getMediaTypeAndSource(url) {
  if (!url) return { type: "none", src: "" };

  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isDrive = url.includes("drive.google.com");
  const isDirectVideo = url.endsWith(".mp4");

  if (isYouTube) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/);
    const id = match?.[1];
    if (id)
      return { type: "youtube", src: `https://www.youtube.com/embed/${id}` };
  }

  if (isDrive) {
    const match = url.match(/\/d\/([^/]+)\//);
    const id = match?.[1];
    if (id)
      return {
        type: "drive",
        src: `https://drive.google.com/file/d/${id}/preview`,
      };
  }

  if (isDirectVideo) {
    return { type: "video", src: url };
  }

  return { type: "image", src: url };
}

const HVOPreview = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const primaryColor = data.primary_color || "#72056C"; // Default color
  // const gradientBg = generateGradient(primaryColor);
  const customerId = window.location.href.split("/").pop().trim();

  // Extract sections safely

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${ApiConfig.getHVO}/${customerId}`);
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching HVO:", err);
        setError("Failed to load HVO");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoUrl();
  }, [customerId]);

  const headerSection = data?.data_list?.find(
    (section) => section.sectionName === "HEADER"
  );
  const heroSection = data?.data_list?.find(
    (section) => section.sectionName === "HERO"
  );
  const highlightBanner = data?.data_list?.find(
    (section) => section.sectionName === "HIGHLIGHT_BANNER"
  );
  const leftImageRightText = data?.data_list?.find(
    (section) => section.sectionName === "RIGHT_TEXT_LEFT_IMAGE"
  );
  const leftTextRightImage = data?.data_list?.find(
    (section) => section.sectionName === "LEFT_TEXT_RIGHT_IMAGE"
  );
  const centerImageSection = data?.data_list?.find(
    (section) => section.sectionName === "CENTER_IMAGE_CENTER_TEXT"
  );

  const { type, src } = getMediaTypeAndSource(heroSection?.values?.hero_img);

  return (
    <div className={styles.bgGradient}>
      {headerSection && (
        <div className={styles.logoContainer}>
          {headerSection.values.company_logo && (
            <img
              src={headerSection.values.company_logo}
              alt="Company Logo"
              className={styles.logo1}
            />
          )}
          <div className={styles.plus}>+</div>
          {headerSection.values.header_logo && (
            <img
              src={headerSection.values.header_logo}
              alt="Header Logo"
              className={styles.logo}
            />
          )}
        </div>
      )}
      {/* Hero Section */}
      {heroSection && (
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            {/* Hero Text Content */}
            {heroSection.values.headline1 && (
              <h1
                className={styles.heroTitle}
                style={{
                  fontSize: `${heroSection.values.headline1_size}px`,
                  color: heroSection.values.headline1_color,
                }}
              >
                <span className={styles.clientName}>
                  {heroSection.values.headline1}
                </span>
              </h1>
            )}

            {heroSection.values.headline2 && (
              <h2
                style={{
                  fontSize: `${heroSection.values.headline2_size}px`,
                  color: heroSection.values.headline2_color,
                }}
              >
                {heroSection.values.headline2}
              </h2>
            )}
            {heroSection.values.body_text && (
              <p
                className={styles.bodyText}
                style={{
                  fontSize: `${heroSection.values.body_text_size}px`,
                  color: heroSection.values.body_text_color,
                }}
              >
                {heroSection.values.body_text}
              </p>
            )}

            {/* Buttons */}
            <div className={styles.buttons}>
              {heroSection.values.cta_button_text && (
                <a
                  href={heroSection.values.dynamic_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
            </div>
          </div>

          {src &&
            (type === "youtube" || type === "drive" ? (
              <iframe
                className={styles.heroImage}
                src={src}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Hero Video"
                width="100%"
                height="auto"
              />
            ) : type === "video" ? (
              <video
                className={styles.heroImage}
                src={src}
                controls
                autoPlay
                muted
                loop
              />
            ) : (
              <img className={styles.heroImage} src={src} alt="Hero" />
            ))}
        </div>
      )}

      {/* Highlight Banner */}
      {highlightBanner && <HighlightBanner bannerData={highlightBanner} />}

      {/* Left Image Right Text Section */}
      {leftImageRightText && (
        <div className={styles.leftImageRightText}>
          <div className={styles.container}>
            <img
              src={leftImageRightText?.values?.left_image_right_text}
              className={styles.sectionImage}
            />
            <div className={styles.textContent}>
              <h3
                style={{
                  fontSize: `${leftImageRightText.values.headline1_size}px`,
                  color: leftImageRightText.values.headline1_color,
                }}
              >
                {leftImageRightText.values.headline1}
              </h3>
              <p
                style={{
                  fontSize: `${leftImageRightText.values.body_text_size}px`,
                  color: leftImageRightText.values.body_text_color,
                }}
              >
                {leftImageRightText.values.body_text}
              </p>

              {/* Button */}
              <div className={styles.buttons}>
                {/* {leftImageRightText.values.cta_button_text && ( */}
                <a
                  href={leftImageRightText?.values?.cta_button_text}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    style={{
                      backgroundColor:
                        leftImageRightText.values.cta_button_color,
                      color: leftImageRightText.values.cta_button_text_color,
                    }}
                  >
                    See Yours
                  </button>
                </a>
                {/* )} */}
              </div>
            </div>
          </div>
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

              {/* {leftTextRightImage.values.headline2 && (
                                <h3
                                    style={{
                                        fontSize: `${leftTextRightImage.values.headline2_size}px`,
                                        color: leftTextRightImage.values.headline2_color,
                                    }}
                                >
                                    {leftTextRightImage.values.headline2}
                                </h3>
                            )} */}
              <p
                style={{
                  fontSize: `${leftTextRightImage.values.body_text_size}px`,
                  color: leftTextRightImage.values.body_text_color,
                }}
                className={styles.leftTextRightImageBodyText}
              >
                {leftTextRightImage.values.body_text}
              </p>

              {/* Button */}
              <div className={styles.buttons}>
                {/* {leftTextRightImage.values.cta_button_text && ( */}
                <a
                  href={leftTextRightImage.values.cta_button_text}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    style={{
                      backgroundColor:
                        leftTextRightImage.values.cta_button_color,
                      color: leftTextRightImage.values.cta_button_text_color,
                    }}
                  >
                    See Yours
                  </button>
                </a>
                {/* )} */}
              </div>
            </div>
            <img
              src="/images/HVO/left_text_right_image.svg"
              className={styles.sectionImage}
            />
          </div>
        </div>
      )}

      {centerImageSection && (
        <div
          className={styles.centerImageSection}
          style={{ backgroundColor: centerImageSection.values.bg_color }}
        >
          <div className={styles.container}>
            <div className={styles.centerContent}>
              <h1
                style={{
                  color: centerImageSection.values.headline1_color,
                  marginBottom: "8px",
                }}
              >
                {centerImageSection.values.headline1}
              </h1>

              <h3
                style={{
                  color: centerImageSection.values.headline2_color,
                  marginTop: "0",
                }}
              >
                {centerImageSection.values.headline2}
              </h3>

              <img
                src={centerImageSection.values.center_image_url}
                className={styles.centerImage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HVOPreview;
